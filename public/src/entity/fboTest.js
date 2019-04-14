class FboTest {
  constructor(pos) {
    this.type = "unko";
    this.pos = pos;

    this.program = Material.GetProgram("fboTest");
    this.primitiveType = "ELEMENTS";

    this.Init();
  }
  Init() {
    const vertices = SquareArray(3);
    const uv = SquareUVArray();
    // const uv = [
    //   0.0 , 0.0 ,
    //   1.0 , 0.0 ,
    //   0.0 , 1.0 ,
    //   1.0 , 1.0 ,
    // ];
    const idx = [0, 2, 1, 1, 2, 3];

    this.buffers = [
      this.VBO = new Buffer(vertices, "position", 3),
      this.uvAttr = new Buffer(uv, "uv", 2),
    ];

    this.drawObject = new DrawObject(this.buffers, this.program);
    this.drawObject.SetIBO(idx);
    this.drawObject.Init(this);

    this.drawObject.AddUniform("rotMatrix", "mat4", () => {
      const v = world.mainCamera.GetViewMatrix();
      return [
        v[0], v[4], v[8], 0,
        v[1], v[5], v[9], 0,
        v[2], v[6], v[10], 0,
        0, 0, 0, 1
      ];
    });
    this.drawObject.AddUniform("viewMatrix","mat4",()=>{return world.mainCamera.GetViewMatrix()});
    this.drawObject.AddUniform("projMatrix","mat4",()=>{return world.mainCamera.GetProjMatrix()});
    this.drawObject.AddUniform("transformMatrix","mat4",()=>{return GetTransformMatrix(this.pos)});
    this.drawObject.AddUniform("size", "1f", () => 1);
    this.drawObject.AddUniform("tex", "texture", ()=>{return Material.GetTexture("fbo")});
  }
  Update() {
  }
  Draw() {
    this.drawObject.Draw();
  }

}