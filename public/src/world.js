class World{
  constructor(){
    this.entities = [];
    this.mainCamera;
  };
  async Init(){
    await Material.Init();
    this.mainCamera = new Camera(vec3(0,0,-1));
    this.Add(this.mainCamera);

    cl("po")
    this.Add(new Floor(vec3(0,-3,0)));//floor
    this.Add(new Floor(vec3(0,3,0)));//ceil
  }
  Add(entity){
    this.entities.push(entity);
  };
  Update(){
    //if(globalTime%20 == 19 && globalTime < 150)Event.onAddUser(Math.random());
    if(globalTime == 140) this.Add(new Character("U"));
    if(globalTime == 180) this.Add(new Character("N"));
    if(globalTime == 190) this.Add(new Character("K"));
    if(globalTime == 200) this.Add(new Character("O"));
    this.entities.forEach(e=>e.Update());
    this.Draw();
  }
  Draw(){
    gl.clearColor(0.99,0.98,0.99,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    this.entities.forEach(e=>e.Draw());
    gl.flush();
  }
}
