class Socket{
  constructor(){
    this.socket = io.connect();
  }
  listen(){
    this.socket.on("addUser", user => {
      cl(user);
      const userID = user.id;
      const username = user.name;
      const score = user.score;
      //eventManager.onUserAdd(userID, username, score);
      Event.onAddUser(username);
    });
  }
  Emit(eventName,data){
    this.socket.emit(eventName,data);
  }
}
