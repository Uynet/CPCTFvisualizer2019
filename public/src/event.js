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

    //エフェクト
    const v = world.mainCamera.GetViewMatrix();
    const rot = [
      v[0], v[4], v[8], 0,
      -v[1], -v[5], -v[9], 0,
      v[2], v[6], v[10], 0,
      0, 0, 0, 1
    ];
    //波紋エフェクト追加
    world.Add(new Ripple(user.pos, rot));
  }
}
