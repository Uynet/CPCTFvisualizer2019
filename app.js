let app = require("http").createServer(handler),
  io = require("socket.io").listen(app),
  fs = require("fs");
app.listen(3000);
function handler(req,res){
  fs.readFile(__dirname + "/index.html" , (err,data)=>{
    if(err){
      res.writeHead(500);
      return res.end("internal unko");
    }
    res.writeHead(200); 
    res.write(data);
    res.end()

  })
}
io.sockets.on("connection",socket=>{
  socket.on("emit_from_client",data=>{
    //console.log(data);
    io.sockets.emit("emit_from_server","hello"+data);
  });
});
