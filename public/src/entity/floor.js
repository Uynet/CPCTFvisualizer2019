//格子状の床
class Floor{// extends Entity{
  constructor(pos){
    //super();
    this.pos = pos;
    this.buffers;
    this.program = Material.GetProgram("floor");
    const self = this;
    //this.primitiveType = "TRIANGLES";
    this.primitiveType = "ELEMENTS";
    this.Init();
    //uniform変数名、型、代入する値を返す関数
    this.drawObject.AddUniform("time","1f",()=>{return globalTime});
    this.drawObject.AddUniform("viewMatrix","mat4",()=>{return world.mainCamera.GetViewMatrix()});
    this.drawObject.AddUniform("projMatrix","mat4",()=>{return world.mainCamera.GetProjMatrix()});
    this.drawObject.AddUniform("transformMatrix","mat4",()=>{return GetTransformMatrix(self.pos)});
    this.drawObject.AddUniform("trap","texture",()=>{return Material.GetTexture("trap")});
  }
  Init(){
    const vertices = SquareArray(25.0);
    const uv = SquareUVArray();

    this.buffers = [
      this.VBO = new Buffer(vertices,"position",3),
      this.UVAttr = new Buffer(uv,"uv",2),
    ]

    this.drawObject = new DrawObject(this.buffers,this.program);
    const index = [0,1,2,1,2,3];
    this.drawObject.SetIBO(index);
    this.drawObject.Init(this);
  };
  Update(){
  }
  Draw(){
    this.drawObject.Draw();
  }
}
