class Socket{
  constructor(){
    this.socket = io.connect();
  }
  listen(){
    this.socket.on("addUser", userdata => {
      if(isVisualizerReady)EventManager.onAddUser(userdata);
    });
    this.socket.on('openProblem', problemInfo => {
      let userID = problemInfo.userID; 
      let user = world.userList[userID];
      cl(user.name + "opened");

      //EventManager.GetScore(user,100);
    });
    this.socket.on('sendFlag', sendInfo => {
      const userID = sendInfo.userID;
      const problemID = sendInfo.problemID;
      const isSolved = sendInfo.isSolved;
      const score = sendInfo.score;

      const user = world.userList[userID];
      console.log("sendaFlag:"+user.name +":"+score);

      EventManager.GetScore(user,score);
    });
    this.fetch();
  }
  Emit(eventName,data){
    this.socket.emit(eventName,data);
  }
  fetch(){
    this.socket.emit('requestFromVisualizer', '');
  }
}
