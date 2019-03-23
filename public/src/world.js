class World{
  constructor(){
    this.entities = [];
    this.mainCamera;
  };
  async Init(){
    await Material.Init();
    this.mainCamera = new Camera();
    this.Add(this.mainCamera);

    this.Add(new Floor(vec3(0,-3,0)));//floor
    this.Add(new Floor(vec3(0,3,0)));//ceil
    this.Add(new Ico(vec3(0)));//正二十面体
    this.Add(new Ring(vec3(0), 3, 0.3, 64));
    this.Add(new Ring(vec3(0), 24, 0.3, 128));
    this.Add(new TextBox("CPCTF",vec3(0,1,0)));

    for(let i=0;i<10;i++){
      const u = {
        name : "Test"+i,
        id : i,
        score: Dice(4000),
      }
      this.Add(new User(u));
    }

  }
  Add(entity){
    this.entities.push(entity);
  };
  Update(){
    //if(globalTime%20 == 19 && globalTime < 150)Event.onAddUser(Math.random());
    this.entities.forEach(e=>e.Update());
    this.Draw();
  }
  Draw(){
    gl.clearColor(0.999,0.98,1.00,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    this.entities.forEach(e=>e.Draw());
    gl.flush();
  }
}
