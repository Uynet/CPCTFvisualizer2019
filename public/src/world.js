class World{
  constructor(){
    this.entities = [];
    this.userList = [];
    this.mainCamera;
  };
  async Init(){
    await Material.Init();
    this.mainCamera = new Camera();
    this.Add(this.mainCamera);

    //this.Add(new Floor(vec3(0,-6,0)));//floor
    this.Add(new Floor(vec3(0,0,0)));//ceil
    this.Add(new Ico(vec3(0),36));//正二十面体
    this.Add(new Ico(vec3(0),2));//正二十面体
    this.Add(new Ring(vec3(0), 12, 0.3, 64));
    this.Add(new Ring(vec3(0,4,0), 18, 0.3, 64));
    this.Add(new Ring(vec3(0,-4,0), 18, 0.3, 64));
    this.Add(new Ring(vec3(0), 24, 0.3, 128));
    this.Add(new TextBox("CPCTF",vec3(0,0,0)));

    for(let i=0;i<1;i++){
      const u = {
        name : "Test"+i,
        id : i,
        score: 100,
      }
      this.Add(new User(u));
    }

  }
  Add(entity){
    this.entities.push(entity);
    switch(entity.type){
      case  "user" : this.userList.push(entity); break;
      default : break;
    }
  };
  Update(){
    gl.clearColor(0.999,0.98,1.00,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      //たまに得点イベントを発生させる(debug)
    if(globalTime%100 == 99){
      let l = this.userList.length;
      this.userList[Dice(l)].GetScore(77);
      //this.mainCamera.SetFocus(this.userList[0]);
    }
    this.entities.forEach(e=>{
      e.Update();
      e.Draw()
    });
    //this.Draw();
    gl.flush();
  }
  Draw(){
  }
}
