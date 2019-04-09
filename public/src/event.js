class Event{
  static onAddUser(userdata){
    world.Add(new User(userdata)); 
  }
  //ユーザと手に入れた得点
  static GetScore(user,score){
    let text = user.name + " won " + score + " points!";
    cl(text);
    user.GetScore(score);
    //world.Add(new Console(text));
  }
}
