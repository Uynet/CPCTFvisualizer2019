class World{
  constructor(){
    this.entities = [];
    this.mainCamera;
  };
  async Init(){
    await Material.Init();
    this.mainCamera = new Camera(vec3(0,0,-1));
    this.Add(this.mainCamera);

    Event.onAddUser(Math.random());

    this.Add( new Floor(vec3(0,-3,0)));//floor
    this.Add(new Floor(vec3(0,3,0)));//ceil


  }
  Add(entity){
    this.entities.push(entity);
  };
  Update(){
    if(globalTime%10 == 9 && globalTime < 1500)Event.onAddUser(Math.random());
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
