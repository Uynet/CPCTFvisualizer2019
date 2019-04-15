const webSocket = require("websocket");
const webSocketClient = webSocket.client;
const client = new webSocketClient();
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io").listen(app.listen(3000));
const fs = require("fs");
const request = require("request");
app.use(express.static("public"));

let userPrevJson = [];


const fetcher = new class{
  listen(){
    //t秒に一度、情報を取得
    let t = 5;
    setInterval(() => {
      console.log("Getting UserInfo..."+Math.random());
      this.getUserInfo();
      //this.getProblemInfo();
    }, 1000*t);
  }
  updateUserList(body) {
    /*ユーザーリストが更新されていれば追加*/
    let userNextJson = JSON.parse(body);
    const curLen = userPrevJson.length;
    const nextLen = userNextJson.length;
    if (curLen < nextLen) {
      const newUsers = userNextJson.slice(0);
      newUsers.forEach(user => {
        console.log(user);
        io.emit('addUser', {
          name: user.name,
          id: user.id,
          score: user.score,
          icon_url: user.icon_url
        });
      });
    }
    userPrevJson = userNextJson;
  }

  getUserInfo(){
    //これはユーザー一覧を取得するAPI
    //const url = "http://localhost:3000/api/users"//これはテスト用
    //const url = "https://server.problem.cpctf.space/api/1.0/users" //こっちが正しい
    const url = "https://cpctf.space/api/1.0/users" //こっちが正しい
    request(url, (error, response, body) => {
      if(!error && response.statusCode === 200){
        this.updateUserList(body);
      }else{
        console.log(error);
      }
    });
  }
  getUserInfoAll(){
    //これはユーザー一覧を取得するAPI
    //const url = "http://localhost:3000/api/users"//これはテスト用
    //const url = "https://server.problem.cpctf.space/api/1.0/users" //こっちが正しい
    const url = "https://cpctf.space/api/1.0/users" //こっちが正しい
    request(url, (error, response, body) => {
      if(!error && response.statusCode === 200){
        /*ユーザーリストが更新されていれば追加*/
        let userNextJson = JSON.parse(body);
        const newUsers = userNextJson;
          newUsers.forEach(user => {
            console.log(user);
            io.emit('addUser', {
              name: user.name,
              id: user.id,
              score: user.score,
              icon_url: user.icon_url
            });
          });
        userPrevJson = userNextJson;
      }else{
        console.log(error);
      }
    });
  }
  getProblemInfo(){
    const url = 'https://server.problem.cpctf.space/api/1.0/challenges';
    request(url, (error, response, body) => {
      if(!error && response.statusCode === 200){
        console.log(response);
      }else{
        console.log(error);
      };
    });
  };
}
fetcher.listen();

//debug
app.get("/api/users",(req,res)=>{
  const data = fs.readFileSync(__dirname + "/test/userlist.json", {encoding: "utf-8"});
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(data);
  res.end();
});

client.on('connectFalied', () => {
  console.log("po");
});
client.on('connect', connection => {
  console.log("connection started.");
  connection.on('error', error => {
      console.log(error); 
      client.connect('wss://cpctf.site/api/1.0/ws');
  });
  connection.on('close', () => { 
      console.log('closed');
      client.connect('wss://cpctf.space/api/1.0/ws');
  });
  connection.on('message', data => {
      const res = JSON.parse(data.utf8Data); 
      console.log(res);
      if(res.eventName === "openProblem"){
          const userID = res.userID;
          const problemID = res.problemID;

          io.emit('openProblem', {
              userID: userID,
              problemID: problemID,
          });
      }else if(res.eventName === "sendFlag"){
        console.log("★★★★send★★★★");
          const userID = res.userID;
          const problemID = res.problemID;
          const username = res.username;
          const isSolved = res.isSolved;
          const score = res.score;

          io.emit('sendFlag', {
              userID: userID,
              username: username,
              problemID: problemID,
              isSolved: isSolved,
              score: score,
          });
      }
  });
});

client.connect('wss://cpctf.space/api/1.0/ws');

io.on('connection', socket => {
  socket.on('requestFromVisualizer', () => {
    console.log("user requested user data");
    //fetcher.getProblemInfoAll(socket);
    fetcher.getUserInfoAll();
    /*fetcher.sendUserIfNeeded({}, userPrevJson);
    fetcher.sendProblemIfNeeded({}, probPrevJson);*/
  });

   console.log("connect♡")
   const po = ()=>{
     //ユーザーリストがからのときのみ
     //if(userPrevJson.length == 0){
     fetcher.getUserInfoAll();
   }
   setTimeout(po,2000);
});