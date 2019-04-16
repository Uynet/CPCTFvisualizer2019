const eventList = [];

class EventManager{
  static Add(event){eventList.push(event)}
  static Remove(event){eventList.remove(event)}
  static ConsumeEvent(){
    for (let event of eventList){
      if(event.Do().done)this.Remove(event);
    }
  }
  static onAddUser(userdata){
    //既に追加されていない && 作文者でない
    if(world.userList[userdata.id]===undefined && userdata.is_author == false){
      cl("Added User:" + userdata)
      world.Add(new User(userdata)); 
    }else{
      //cl("Alleady Added user:"+userdata.name);
    }
  }
  //ユーザと手に入れた得点
  static GetScore(user,score){
    let text = user.name + " won " + score + " points!";
    cl(text);
    this.Add(new SolveProbremEvent(user,score));
  }
}
