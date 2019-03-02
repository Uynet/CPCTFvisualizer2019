class World{
  constructor(){
    this.entities = [];
  };
  async Init(){
    const floor = new Floor();
    await floor.Init();
    this.Add(floor);
  }
  Add(entity){
    this.entities.push(entity);
  };
  Draw(){
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    this.entities.forEach(e=>e.Draw());
    gl.flush();
  }
}
