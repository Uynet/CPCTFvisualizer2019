class Socket{
  constructor(){
    this.socket = io.connect();
  }
  listen(){
    this.socket.on("addUser", userdata => {
      EventManager.onAddUser(userdata);
    });
  }
  Emit(eventName,data){
    this.socket.emit(eventName,data);
  }
}
