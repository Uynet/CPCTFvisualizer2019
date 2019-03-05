class World{
  constructor(){
    this.entities = [];
    this.mainCamera;
  };
  async Init(){
    this.mainCamera = new Camera(vec3(0,0,-1));
    this.Add(this.mainCamera);


    const unko = new Array(10);
    for(let i = 0;i<10;i++){
      if(i!=5)continue;
      unko[i] =  new Floor(vec3((i-5)*0.3,0,0));
      await unko[i].Init();
      this.Add(unko[i]);
    }
  }
  Add(entity){
    this.entities.push(entity);
  };
  Update(){
    this.entities.forEach(e=>e.Update());
    this.Draw();
  }
  Draw(){
    gl.clearColor(0.9,0.9,0.9,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    this.entities.forEach(e=>e.Draw());
    gl.flush();
  }
}
