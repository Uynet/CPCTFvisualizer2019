class Ripple {
  // 場所, 最大サイズ, 拡大時間, 拡大後生存時間
  constructor(pos, maxSize = 1, expandFrame = 10, lastFrame = 5) {
    this.pos = pos;
    this.maxSize = maxSize;
    this.expandFrame = expandFrame;
    this.lastFrame = lastFrame;

    this.program = Material.GetProgram("ripple");
    this.primitiveType = "ELEMENTS";

    this.Init();
  }
  Init() {
    this.frameCount = 0;

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
    this.drawObject.AddUniform("size", "1f", ()=>{return this.getSize()});
  }
  getSize() {
    return Math.min(1, Math.pow(this.frameCount / this.expandFrame, 2)) * this.maxSize;
  }
  Update() {
    this.frameCount++;
    if (this.frameCount === this.expandFrame + this.lastFrame) {
      //消滅させる処理
      console.log("消滅");
    }
  }
  Draw() {
    this.drawObject.Draw();
  }

}