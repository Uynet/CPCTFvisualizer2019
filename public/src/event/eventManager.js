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
    let user = world.userList[userdata.id];
    if(user===undefined && userdata.is_author == false){
      if(Dice(12)==1 && world.userLen<50){
        cl("Added User:");
        world.Add(new User(userdata)); 
        RankingUpdate();
      }
    }else{
      //cl("Alleady Added user:"+userdata.name);
      /*
      if(userdata.score != user.score){
        user.SetScore(userdata.score);
        cl("score modified:"+user.name);
      }
      */
    }
  }
  //ユーザと手に入れた得点
  static GetScore(user,score){
    let text = user.name + " won " + score + " points!";
    cl(text);
    this.Add(new SolveProbremEvent(user,score));
  }
}
