class Floor{
  constructor(){
    this.pos = vec3(0);
  }
  async Init(){
    const vertices = SquareArray(0.4);
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
    this.pos.x = Math.sin(globalTime*0.02)*0.5;
  }
  Draw(){
    this.drawObject.Draw();
  }
}
