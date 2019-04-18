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
      let usersize_shrinking = usersize;
      let rot;
      //回転が加速
      while (i++ < 50) yield; i = 0;
      Audio.PlaySE("solve",1,1.0);
      //波紋エフェクト追加
      //Ripple(pos,size,startsize,endsize,expandFlame,lastFrame)
      while(t++<10){
        user.cube.accel++;
        Audio.PlaySE("poyo1",0.7,0.3 + t/8);
        rot = self.getRotMatrix();
        p = copy(user.pos);
        let amp = usersize * 2;
        p.x += Rand(amp);
        p.y += Rand(amp);
        p.z += Rand(amp);
        let size = (Math.random()+t*0.1)*usersize;
        world.Add(new Ripple(p, rot,0,size));
        yield;
        while (i++ < 5){
          user.cube.accel++;
          user.localTime += (t * 10 +i) * 0.2;
          let camera = world.mainCamera;
          let d = Math.PI * 0.2 - camera.FOV;
          camera.FOV += d * 0.02;
          //user.GetScore(score/50);
          yield;
        } i=0;
      }
      //収縮
      user.cube.accel=0;
      EventManager.Add(new CameraEffect(world.mainCamera));
      while (i++ < 10){
          usersize_shrinking *= 0.90;
          user.cube.SetSize(usersize_shrinking);
          yield;
      } i=0;
      user.GetScore(score);
      EventManager.Add(new ConsoleEvent(user, score));
      //デカい爆発
      Audio.PlaySE("bomb",1,0.7);
      rot = self.getRotMatrix();
      p = copy(user.pos);
      world.Add(new Ripple(p, rot, 0, usersize * 10 ,120,3));

      while (i++ < 500) yield; i=0;
      world.mainCamera.DeFocus(user);
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
