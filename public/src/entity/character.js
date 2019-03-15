class Character{
  constructor(char){
    this.char = char;
    this.pos = vec3(0,1,0);
    this.buffers;
    this.program = Material.GetProgram("user");
    this.localTime = 0;
    const self = this;
    this.primitiveType = "POINTS";
    this.unko = 2;
    this.Init();
    this.drawObject.AddUniform("time","1f",()=>{return globalTime});
    this.drawObject.AddUniform("viewMatrix","mat4",()=>{return world.mainCamera.GetViewMatrix()});
    this.drawObject.AddUniform("projMatrix","mat4",()=>{return world.mainCamera.GetProjMatrix()});
    this.drawObject.AddUniform("transformMatrix","mat4",()=>{return GetTransformMatrix(self.pos)});
    this.drawObject.AddUniform("trap","texture",()=>{return Material.GetTexture(this.char)});
    this.drawObject.AddUniform("billMatrix","mat4",()=>{
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
    this.pos.x = Math.sin(this.localTime*0.004);
    this.pos.z = Math.cos(this.localTime*0.004);
  }
  Draw(){
    this.drawObject.Draw();
  };
}
