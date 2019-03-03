class Floor{
  constructor(){}
  async Init(){
    const vertices = SquareArray(1.5);
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
    this.drawObject.Init();
  };
  Update(){
  }
  Draw(){
    this.drawObject.Draw();
  }
}
