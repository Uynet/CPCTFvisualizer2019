class SolveProbremEvent extends Event {
  constructor(user,score) {
    super()
    function* gen() {
      world.mainCamera.SetFocus(user);
      let t = 0;
      let i = 0;
      let p;
      while (i++ < 50) yield; i = 0;
      const v = world.mainCamera.GetViewMatrix();
      const rot = [
        v[0], v[4], v[8], 0,
        -v[1], -v[5], -v[9], 0,
        v[2], v[6], v[10], 0,
        0, 0, 0, 1
      ];
      //波紋エフェクト追加
      //Ripple(pos,size,startsize,endsize,expandFlame,lastFrame)
      while(t++<8){
        p = copy(user.pos);
        p.x += Rand(1);
        p.y += Rand(1);
        p.z += Rand(1);
        let size = Math.random()*3;
        world.Add(new Ripple(p, rot,0,size));
        yield;
        while (i++ < 5) yield; i=0;
      }
      while (i++ < 10) yield; i=0;
      user.GetScore(score);
      //デカイ
      EventManager.Add(new CameraEffect(world.mainCamera));
      p = copy(user.pos);
      world.Add(new Ripple(p, rot, 0, 8 ,120,3));

      while (i++ < 90) yield; i=0;
      //world.mainCamera.SetFocus(undefined);
      return;
    }
    let itt = gen();
    this.func = itt;
  }

}
