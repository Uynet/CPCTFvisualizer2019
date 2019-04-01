class Ripple {
  constructor(pos) {
    this.pos = pos;
    this.program = Material.GetProgram("ripple");
    
    this.primitiveType = "ELEMENTS";

    this.Init();
  }
  Init() {
    const vertices = SquareArray(1);
    const uv = SquareUVArray();
    const idx = [0, 2, 1, 1, 2, 3];

    this.buffers = [
      new Buffer(vertices, "position", 3),
      //new Buffer(uv, "uv", 2),
    ];

    this.drawObject = new DrawObject(this.buffers, this.program);
    this.drawObject.SetIBO(idx);
    this.drawObject.Init(this);

    this.drawObject.AddUniform("viewMatrix","mat4",()=>{return world.mainCamera.GetViewMatrix()});
    this.drawObject.AddUniform("projMatrix","mat4",()=>{return world.mainCamera.GetProjMatrix()});
    this.drawObject.AddUniform("transformMatrix","mat4",()=>{return GetTransformMatrix(this.pos)});
  }
  Update() {

  }
  Draw() {
    this.drawObject.Draw();
  }
}