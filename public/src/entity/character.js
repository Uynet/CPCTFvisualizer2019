class Character{
  constructor(char,pos){
    this.char = char;
    this.pos = pos;
    //this.size = 128;if(char>="a")this.size = 64;

    this.buffers;
    this.program = Material.GetProgram("character");
    this.localTime = 0;
    const self = this;
    this.primitiveType = "POINTS";
    this.Init();
    this.drawObject.AddUniform("time","1f",()=>{return globalTime});
    this.drawObject.AddUniform("viewMatrix","mat4",()=>{return world.mainCamera.GetViewMatrix()});
    this.drawObject.AddUniform("projMatrix","mat4",()=>{return world.mainCamera.GetProjMatrix()});
    this.drawObject.AddUniform("transformMatrix","mat4",()=>{return GetTransformMatrix(self.pos)});
    this.drawObject.AddUniform("char","texture",()=>{return Material.GetTexture(this.char)});
    this.drawObject.AddUniform("billMatrix","mat4",()=>{
    //this.drawObject.AddUniform("pointsize","1f",()=>{return self.size});
      const po = 
      LockAt(
        self.pos,//eye
        sub(world.mainCamera.pos , self.pos),//for
        vec3(0,1,0)//up
      )
      return po;
    });
  }
  Init(){
    const uv = SquareUVArray();
    this.VBO = new Buffer([0,0,0],"position",3);
    this.UVAttr = new Buffer(uv,"uv",2);

    this.buffers = [
      this.VBO,
      this.UVAttr
    ]

    this.drawObject = new DrawObject(this.buffers,this.program);
    this.drawObject.Init(this);
  }

  Update(){
    this.localTime++;
  }
  Draw(){
    this.drawObject.Draw();
  };
}
