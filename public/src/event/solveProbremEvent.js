class SolveProbremEvent extends Event {
  constructor(user) {
    super()
    const v = world.mainCamera.GetViewMatrix();
    const rot = [
      v[0], v[4], v[8], 0,
      -v[1], -v[5], -v[9], 0,
      v[2], v[6], v[10], 0,
      0, 0, 0, 1
    ];
    function* gen() {
      let t = 0;
      let i = 0;
      let p;
      //波紋エフェクト追加
      while(t++<15){
        p = copy(user.pos);
        p.x += Rand(1);
        p.y += Rand(1);
        p.z += Rand(1);
        world.Add(new Ripple(p, rot));
        yield;
        while (i++ < 15) yield;
      }
      return;
    }
    let itt = gen();
    this.func = itt;
  }

}
