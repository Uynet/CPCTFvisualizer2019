class Socket{
  constructor(){
    this.socket = io.connect();
  }
  listen(){
    this.socket.on("addUser", userdata => {
      EventManager.onAddUser(userdata);
    });
    this.socket.on('sendFlag', sendInfo => {
      const userID = sendInfo.userID;
      const problemID = sendInfo.problemID;
      const isSolved = sendInfo.isSolved;
      const score = sendInfo.score;

      const user = wolrd.userList[userID];

      EventManager.GetScore(sendInfd);
    });
  }
  Emit(eventName,data){
    this.socket.emit(eventName,data);
  }
}
