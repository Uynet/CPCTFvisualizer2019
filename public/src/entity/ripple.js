class Ripple {
  // 場所, 向き(回転行列), 開始サイズ, 終了サイズ, 拡大時間, 拡大後生存時間
  constructor(pos, rot, startSize, endSize, expandFrame, lastFrame) {
    if(expandFrame===undefined)expandFrame = 40;
    if(lastFrame===undefined)lastFrame = 20;
    this.type = "ripple";
    this.pos = pos;
    this.rot = rot;
    this.startSize = startSize;
    this.endSize = endSize;
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

    this.drawObject.AddUniform("rotMatrix", "mat4", () => this.rot);
    this.drawObject.AddUniform("viewMatrix","mat4",()=>{return world.mainCamera.GetViewMatrix()});
    this.drawObject.AddUniform("projMatrix","mat4",()=>{return world.mainCamera.GetProjMatrix()});
    this.drawObject.AddUniform("transformMatrix","mat4",()=>{return GetTransformMatrix(this.pos)});
    this.drawObject.AddUniform("time", "1f", ()=>{return this.frameCount/this.expandFrame});
    this.drawObject.AddUniform("size", "1f", ()=>{return this.getSize()});
    this.drawObject.AddUniform("trap", "texture", ()=>{return Material.GetTexture("trap")});
  }
  getSize() {
    //return this.startSize + Math.min(1, Math.pow(this.frameCount / this.expandFrame, 4)) * (this.endSize - this.startSize);
    //let sizeWidth = (this.endSize - this.startSize);
    return this.endSize;
    //return this.startSize + sizeWidth * easeOut(x);
  }
  Update() {
    this.frameCount++;
    if (this.frameCount === this.expandFrame + this.lastFrame) {
      //消滅させる処理
      world.Remove(this);
    }
  }
  Draw() {
    this.drawObject.Draw();
  }

}