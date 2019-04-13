class TextBox{
  constructor(text,pos){
    this.pos = pos;
    this.type = "text";
    this.text = text
    this.buffers;
    this.program = Material.GetProgram("text");
    this.onReady = false;
    this.primitiveType = "ELEMENTS";
    this.Init();
  }
  async Init(){
    await this.SetTextTexture(this.text);

    const vertices = SquareArray(1.0);
    const uv = SquareUVArray();

    this.buffers = [
      this.VBO = new Buffer(vertices,"position",3),
      this.UVAttr = new Buffer(uv,"uv",2),
    ]

    this.drawObject = new DrawObject(this.buffers,this.program);
    const index = [0,1,2,1,2,3];
    this.drawObject.SetIBO(index);
    this.drawObject.Init(this);

    const self = this;
    this.drawObject.AddUniform("time","1f",()=>{return self.getLocalTime()});
    this.drawObject.AddUniform("viewMatrix","mat4",()=>{return world.mainCamera.GetViewMatrix()});
    this.drawObject.AddUniform("projMatrix","mat4",()=>{return world.mainCamera.GetProjMatrix()});
    this.drawObject.AddUniform("transformMatrix","mat4",()=>{return GetTransformMatrix(self.pos)});
    this.drawObject.AddUniform("rotMatrix", "mat4", ()=>{
      //ビュー変換行列の回転成分の逆行列(交代行列なので転置)を渡す。
      //が、なんか上下が反転してしまうのでそれも修正する
      const v = world.mainCamera.GetViewMatrix();
      return [
        v[0], v[4], v[8], 0,
        -v[1], -v[5], -v[9], 0,
        v[2], v[6], v[10], 0,
        0, 0, 0, 1
      ];
    });
    this.drawObject.AddUniform("trap","texture",()=>{return self.textTexture});
    this.onReady = true;
  };
  async SetTextTexture(text){
    this.text = text;
    this.textTexture = await Material.CreateTextureByString(this.text);
  }
  getLocalTime(){
    if(this.parent!==undefined)return this.parent.localTime;
    else return globalTime;
  }
  SetPos(pos){
    this.pos = copy(pos);
  }
  SetParent(parent){
    this.parent = parent;
  }
  Update(){
    /*Nothing to do*/
  }
  Draw(){
   if(this.onReady) this.drawObject.Draw();
  };
}
