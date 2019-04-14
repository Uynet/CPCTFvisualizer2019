//テクスチャスロットの割当の為に存在している
let currentSlot = 0;
const assignSlot = (texture)=>{
  if(currentSlot => gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS)){
    currentSlot = 0;
    //cl("over slot");
    //return;
  }
  texture.SetSlot(currentSlot);
  gl.activeTexture(gl.TEXTURE0+currentSlot);
  //cl("SLOT"+currentSlot+":"+texture.path);
  currentSlot += 1;
}

//program及びtextureを管理する静的クラス
class Material{
  //事前にロード(非同期)
  static async Init(){
    this.textures = [];
    this.programs = [];
    this.promises = [];//promise list

    let char,path;
    for(let i = 0;i<10;i++){
      char = i+"";
      path = "resource/Fonts/numbers/"+i+".png",
      this.promises.push(this.CreateTexture(char,path));
    }
    await Promise.all(this.promises);
    await Promise.all(
      [
        this.CreateProgram("user","user.vert","user.frag"),
        this.CreateProgram("floor","floor.vert","floor.frag"),
        this.CreateProgram("ring","ring.vert","ring.frag"),
        this.CreateProgram("cube","cube.vert","cube.frag"),
        this.CreateProgram("ico","ico.vert","ico.frag"),
        this.CreateProgram("character","character.vert","character.frag"),
        this.CreateProgram("text","text.vert","text.frag"),
        this.CreateProgram("console","console.vert","console.frag"),
        this.CreateProgram("ripple","ripple.vert","ripple.frag"),
        //this.CreateTexture("trap","resource/img/000.png"), 
        this.CreateTexture("trap","resource/img/trap.png"), 

        this.CreateProgram("fboTest", "ripple.vert", "fboTest.frag"),
      ]
    )
  }
  static CreateCharacterTextures(ALPHABETS_UPPER){
    let char;
    let path;
    for(let i = 0;i<ALPHABETS_UPPER.length;i++){
      char = ALPHABETS_UPPER[i];
      path = "resource/Fonts/"+(i+65)+".png",
      this.promises.push(this.CreateTexture(char,path));
    }
  }
  static async CreateProgram(name,vp,fp){
    const program = new Program(vp,fp);
    await program.Init();
    this.PushProgram(name,program);
    return;
  }
  static async CreateTextureByURL(path){
    const tex = new Texture(path); 
    await tex.Init();
    return tex;
  }
  static async CreateTexture(char,path){
    const tex = new Texture(path); 
    await tex.Init();
    this.PushTexture(char,tex);
    return;
  }
  static async CreateTextureByString(str){
    const cf = new ContextFetcher(str);
    const path = cf.fetch();
    const tex = new Texture(path); 
    await tex.Init();
    //this.PushTexture(char,tex);
    return tex;// this._createTextureByImage(img, textureIndex);
  }
  static PushProgram(name,program){
    this.programs[name] = program;
  }
  static GetProgram(name){
    return this.programs[name];
  }
  static PushTexture(name,texture){
    this.textures[name] = texture;
  }
  static GetTexture(char){
    return this.textures[char];
  }
  AddTexture(texture){
    this.textures.push(texture);
  }
}
