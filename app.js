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
    const url = "http://localhost:3000/api/users"//これはテスト用
    //const url = "https://server.problem.cpctf.space/api/1.0/users" //こっちが正しい
    request(url, (error, response, body) => {
      if(!error && response.statusCode === 200){
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
