//輪っか
class Ring{
  constructor(pos){
    this.pos = pos;
    this.buffers;
    this.program = Material.GetProgram("ring");
    const self = this;
    this.primitiveType = "ELEMTNTS";
    this.Init();
    //uniform変数名、型、代入する値を返す関数
    this.drawObject.AddUniform("time","1f",()=>{return globalTime});
    this.drawObject.AddUniform("viewMatrix","mat4",()=>{return world.mainCamera.GetViewMatrix()});
    this.drawObject.AddUniform("projMatrix","mat4",()=>{return world.mainCamera.GetProjMatrix()});
    this.drawObject.AddUniform("trap","texture",()=>{return Material.GetTexture("trap")});
    this.drawObject.AddUniform("transformMatrix","mat4",()=>{return GetTransformMatrix(self.pos)});
  }
  Init(){
    const vertices = SquareArray(1.0);//★頂点データ
    const index = [0,1,2,1,2,3];      //★index
    //const uv = SquareUVArray();

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
