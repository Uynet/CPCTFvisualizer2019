const consoleStack = [];

class Console{
  constructor(text){
    this.collumn = 0; 
    this.pos = vec3(0,0,0);
    this.text = text
    this.buffers;
    this.program = Material.GetProgram("console");
    this.onReady = false;
    this.primitiveType = "ELEMENTS";
    this.Init();
    consoleStack.forEach(cons=>{cons.collumn -= 1})
    consoleStack.push(this);
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
    this.drawObject.AddUniform("collumn","1f",()=>{return self.collumn});
    this.drawObject.AddUniform("textTexture","texture",()=>{return self.textTexture});
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
  Remove(){
    world.Remove(this);
    consoleStack.remove(this);
  }
  Draw(){
   if(this.onReady) this.drawObject.Draw();
  };
}
