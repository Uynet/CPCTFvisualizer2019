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

    this.Add(new Floor(vec3(0,-6,0)));//floor
    this.Add(new Floor(vec3(0,6,0)));//ceil
    this.Add(new Ico(vec3(0),36));//正二十面体
    this.Add(new Ico(vec3(0),2));//正二十面体
    this.Add(new Ico(vec3(0),52));//正二十面体
    this.Add(new Ring(vec3(0,-24,0), 3, 0.3, 16));
    this.Add(new Ring(vec3(0,+24,0), 3, 0.3, 16));
    this.Add(new Ring(vec3(0), 3, 0.3, 64));
    this.Add(new Ring(vec3(0,4,0), 18, 0.3, 64));
    this.Add(new Ring(vec3(0,-4,0), 18, 0.3, 64));
    this.Add(new Ring(vec3(0), 24, 0.3, 128));
    this.Add(new TextBox("CPCTF",vec3(0,0,0)));

    for(let i=0;i<10;i++){
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
    this.entities.forEach(e=>e.Update());
    let l = this.userList.length;
    if(globalTime%200 == 199){
      this.mainCamera.SetFocus(this.userList[Dice(l)]);
      //50パーくらいの確率で得点ゲット
      this.userList.forEach(
        e=>{
          if(Dice(10)<2){
            let score = Dice(100);
            e.GetScore(score);
          }
        }
      );
    }
    this.Draw();
  }
  Draw(){
    gl.clearColor(0.999,0.98,1.00,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    this.entities.forEach(e=>e.Draw());
    gl.flush();
  }
}
