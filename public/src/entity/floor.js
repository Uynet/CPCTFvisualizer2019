//格子状の床
class Floor{
  constructor(pos){
    this.pos = pos;
    this.buffers;
    this.program;
  }
  async Init(){
    const vertices = SquareArray(10.0);
    const uv = SquareUVArray();
    this.VBO = new Buffer(vertices,"position",3);
    this.UVAttr = new Buffer(uv,"uv",2);

    this.buffers = [
      this.VBO,
      this.UVAttr
    ]

    this.program = new Program("floor.vert","floor.frag");
    await this.program.Init(this.VBO);

    this.trapTexture = new Texture("000.png"); 
    await this.trapTexture.Init();
    cl("po");

    this.drawObject = new DrawObject(this.buffers,this.program);
    this.drawObject.Init(this);
  };
  Update(){
  }
  Draw(){
    this.drawObject.Draw();
  }
}
