class SolveProbremEvent extends Event {
  constructor(user,score) {
    super()
    let self = this;
    function* gen() {
      world.mainCamera.SetFocus(user);
      let t = 0;
      let i = 0;
      let p;
      let usersize = user.cube.size;
      let rot;
      while (i++ < 50) yield; i = 0;
      //波紋エフェクト追加
      //Ripple(pos,size,startsize,endsize,expandFlame,lastFrame)
      while(t++<8){
        Audio.PlaySE("poyo",1,0.3 + t/8);
        rot = self.getRotMatrix();
        p = copy(user.pos);
        let amp = usersize * 2;
        p.x += Rand(amp);
        p.y += Rand(amp);
        p.z += Rand(amp);
        let size = (Math.random()+t*0.1)*usersize;
        world.Add(new Ripple(p, rot,0,size));
        yield;
        while (i++ < 5) yield; i=0;
      }
      while (i++ < 5) yield; i=0;
      EventManager.Add(new ConsoleEvent(user, score));
      user.GetScore(score);
      //デカイ
      Audio.PlaySE("bomb",1,0.7);
      rot = self.getRotMatrix();
      EventManager.Add(new CameraEffect(world.mainCamera));
      p = copy(user.pos);
      world.Add(new Ripple(p, rot, 0, usersize * 10 ,120,3));

      while (i++ < 90) yield; i=0;
      //world.mainCamera.SetFocus(undefined);
      return;
    }
    let itt = gen();
    this.func = itt;
  }
  getRotMatrix(){
    const v = world.mainCamera.GetViewMatrix();
    const rot = [
      v[0], v[4], v[8], 0,
      -v[1], -v[5], -v[9], 0,
      v[2], v[6], v[10], 0,
      0, 0, 0, 1
    ];
    return rot;
  }

}
