//格子状の床
class Floor{
  constructor(pos){
    this.pos = pos;
    this.buffers;
    this.program = Material.floorProgram;
    this.Init();
  }
  Init(){
    const vertices = SquareArray(10.0);
    const uv = SquareUVArray();
    this.VBO = new Buffer(vertices,"position",3);
    this.UVAttr = new Buffer(uv,"uv",2);

    this.buffers = [
      this.VBO,
      this.UVAttr
    ]

    this.drawObject = new DrawObject(this.buffers,this.program);
    this.drawObject.Init(this);
  };
  Update(){
  }
  Draw(){
    this.drawObject.Draw();
  }
}
