class World{
  constructor(){
    this.entities = [];
  };
  Init(){
    this.Add(new Floor());
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
