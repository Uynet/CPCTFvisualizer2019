const webSocketClient = require("websocket").client;
const client = new webSocketClient();
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io").listen(app.listen(3000));
const fs = require("fs");
app.use(express.static("public"));

/*
app.get("/",(req,res)=>{
  const data = fs.readFileSync(__dirname + "/public/index.html", {encoding: "utf-8"});
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(data);
  res.end();
});
*/

/*
io.listen(app.listen(3000,()=>{
  console.log("server port 3000")
});
*/

/*
http.createServer((req,res)=>{
  console.log("server is 3000");
  const data = fs.readFileSync(__dirname + "/public/index.html", {encoding: "utf-8"});
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(data);
  res.end();
}).listen(3000);


*/
io.on("connection",socket=>{
  socket.on("emit_from_client",data=>{
    io.sockets.emit("emit_from_server",data);
  });
});
