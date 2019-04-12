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
    world.Add(new User(userdata)); 
  }
  //ユーザと手に入れた得点
  static GetScore(user,score){
    let text = user.name + " won " + score + " points!";
    cl(text);
    user.GetScore(score);
    this.Add(new SolveProbremEvent(user));
    //world.Add(new Console(text));
  }
}
