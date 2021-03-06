class Ico{
  constructor(pos,size){
    this.pos = pos;
    this.size= size;
    this.buffers;
    this.program = Material.GetProgram("ico");
    const self = this;
    this.primitiveType = "ELEMENTS";
    this.primitiveType = "LINES";
    this.Init();
    //uniform変数名、型、代入する値を返す関数
    this.drawObject.AddUniform("size","1f",()=>{return self.size});
    this.drawObject.AddUniform("time","1f",()=>{return globalTime});
    this.drawObject.AddUniform("viewMatrix","mat4",()=>{return world.mainCamera.GetViewMatrix()});
    this.drawObject.AddUniform("projMatrix","mat4",()=>{return world.mainCamera.GetProjMatrix()});
    this.drawObject.AddUniform("trap","texture",()=>{return Material.GetTexture("trap")});
    this.drawObject.AddUniform("transformMatrix","mat4",()=>{return GetTransformMatrix(self.pos)});
  }
  Init(){
    const [vertices, index] = ico();


    this.buffers = [
      this.VBO = new Buffer(vertices,"position",3),
      //this.UVAttr = new Buffer(uv,"uv",2),
    ]

    this.drawObject = new DrawObject(this.buffers,this.program);
    this.drawObject.SetIBO(index);
    this.drawObject.Init(this);
  };
  Update(){
  }
  Draw(){
    this.drawObject.Draw();
  }
}
