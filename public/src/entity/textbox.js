let currentID = 0;
class TextBox{
  constructor(text,pos){
    this.pos = pos;
    this.text = text
    this.buffers;
    this.program = Material.GetProgram("text");
    this.onReady = false;
    this.primitiveType = "TRIANGLES";
    this.Init();
  }
  async Init(){
    this.textTexture = await Material.CreateTextureByString(this.text);

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
    this.drawObject.AddUniform("trap","texture",()=>{return self.textTexture});
    this.onReady = true;
  };
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
    //this.div.style.left = this.pos.x;
    //this.div.style.top = this.pos.y;
  }
  Draw(){
   if(this.onReady) this.drawObject.Draw();
    /*
    this.characters.forEach(e=>{
      e.Draw();
    });
    */
  };
}
