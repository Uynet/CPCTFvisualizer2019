class Floor{
  constructor(pos){
    this.pos = pos;
  }
  async Init(){
    const vertices = SquareArray(10.0);
    const uv = SquareUVArray();
    this.VBO = new Buffer(vertices,"position",3);
    this.UVAttr = new Buffer(uv,"uv",2);

    const buffers = [
      this.VBO,
      this.UVAttr
    ]

    this.program = new Program("main.vert","main.frag");
    await this.program.Init(this.VBO);

    this.drawObject = new DrawObject(buffers,this.program);
    this.drawObject.Init(this);
  };
  Update(){
    this.pos.x = Math.sin(globalTime*0.01)*8-1;
    this.pos.y = -1;
    this.pos.z = Math.cos(globalTime*0.01)*8-3;
  }
  Draw(){
    this.drawObject.Draw();
  }
}
