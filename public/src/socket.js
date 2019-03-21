class Socket{
  constructor(){
    this.socket = io.connect();
  }
  listen(){
    this.socket.on("addUser", user => {
      Event.onAddUser(user);
    });
  }
  Emit(eventName,data){
    this.socket.emit(eventName,data);
  }
}
