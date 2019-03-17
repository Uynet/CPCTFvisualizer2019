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
    this.getUserInfo();
    setInterval(() => {
      //this.getProblemInfo();
      this.getUserInfo();
    }, 1000*10);
  }
  getUserInfo(){
    //const url = 'https://cpctf.site/api/1.0/users';
    const url = "http://localhost:3000/api/users"
    request(url, (error, response, body) => {
      if(!error && response.statusCode === 200){
        /*なんやかんやあってユーザーリストを手に入れる*/
        let newUsers = JSON.parse(body);
        for(let user in newUsers){
          console.log(newUsers[user]);
          io.emit("addUser",{
            name:newUsers[user].name,
            id:newUsers[user].id,
            score:newUsers[user].score
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
