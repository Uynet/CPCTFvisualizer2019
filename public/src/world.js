class World{
  constructor(){
    this.entities = [];
    this.mainCamera;
  };
  async Init(){
    this.mainCamera = new Camera(vec3(0,0,-1));
    this.Add(this.mainCamera);

    const floor =  new Floor(vec3(0,0,0));
    await floor.Init();
    this.Add(floor);

    //const floor2 =  new Floor(vec3(0,3,0));
    //await floor2.Init();
    //this.Add(floor2);


  }
  Add(entity){
    this.entities.push(entity);
  };
  Update(){
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
