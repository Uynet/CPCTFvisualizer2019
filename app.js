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
    this.getUserInfo();
    //this.getProblemInfo();
    //60秒に一度、情報を取得
    setInterval(() => {
      console.log(Math.random());
      this.getUserInfo();
      //this.getProblemInfo();
    }, 1000*3);
  }
  updateUserList(body) {
    /*ユーザーリストが更新されていれば追加*/
    let userNextJson = JSON.parse(body);
    const curLen = userPrevJson.length;
    const nextLen = userNextJson.length;
    if (curLen < nextLen) {
      const newUsers = userNextJson.slice(curLen);
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
    const url = "http://localhost:3000/api/users"
    //const url = "https://server.problem.cpctf.space/api/1.0/users" 
    request(url, (error, response, body) => {
      if(!error && response.statusCode === 200){
        /*なんやかんやあってユーザーリストを手に入れる*/
        /*
        let newUsers = JSON.parse(body);
        for(let user in newUsers){
          console.log(newUsers[user]);
          io.emit("addUser",{
            name:newUsers[user].name,
            id:newUsers[user].id,
            score:newUsers[user].score,
            icon_url:newUsers[user].icon_url
          });
        };
        */
        this.updateUserList(body);
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

/*
io.listen(app.listen(3000,()=>{
  console.log("server port 3000")
});
*/
io.on("connection",socket=>{
  socket.on("addUserDebug",data=>{
    const user = {
      name : data,
      id: 114514,
      score : 0,
    }
    io.sockets.emit("addUser",user);
  });
});
