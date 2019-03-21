class World{
  constructor(){
    this.entities = [];
    this.mainCamera;
  };
  async Init(){
    await Material.Init();
    this.mainCamera = new Camera(vec3(0,0,-1));
    this.Add(this.mainCamera);

    this.Add(new Floor(vec3(0,-3,0)));//floor
    this.Add(new Floor(vec3(0,3,0)));//ceil
    this.Add(new Ring(vec3(0), 3, 0.3, 64));
    this.Add(new Ring(vec3(0), 24, 0.3, 128));

  }
  Add(entity){
    if(this.entities.length>30){
      console.warn("too many users")
      return;
    }
    this.entities.push(entity);
  };
  Update(){
    //if(globalTime%20 == 19 && globalTime < 150)Event.onAddUser(Math.random());
    this.entities.forEach(e=>e.Update());
    this.Draw();
  }
  Draw(){
    gl.clearColor(0.97,0.97,0.99,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    this.entities.forEach(e=>e.Draw());
    gl.flush();
  }
}
