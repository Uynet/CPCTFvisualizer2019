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


const fetcher = new class{
  listen(){
    //この辺やばい
    //デバッグ用なので後で消す
    const po = ()=>{
      this.getUserInfo();
    }
    function* gen(){
      let cnt = 0;
      while(cnt++<1){
        po();
        yield;
      }
      return;
    }
    const ite = gen();
    setInterval(() => {
      ite.next();
    }, 1000*3);
  }
  getUserInfo(){
    //多分新しく追加されたユーザーを取得するAPI?
    //const url = 'https://cpctf.site/api/1.0/users';
    //これはユーザー一覧を取得するAPI
    const url = "https://server.problem.cpctf.space/api/1.0/users" 
    //const url = "http://localhost:3000/api/users"
    request(url, (error, response, body) => {
      if(!error && response.statusCode === 200){
        /*なんやかんやあってユーザーリストを手に入れる*/
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
      }else{
        console.log(error);
      }
    });
  }
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
