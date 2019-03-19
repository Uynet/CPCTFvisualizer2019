//テクスチャスロットの割当の為に存在している
let currentSlot = 0;
let rock = false;
const assignSlot = (texture)=>{
  if(!rock){
    rock = true;
    if(currentSlot > gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS)){cl("over slot");return;}
    texture.SetSlot(currentSlot);
    gl.activeTexture(gl.TEXTURE0+currentSlot);
    //cl("SLOT"+currentSlot+":"+texture.path);
    currentSlot += 1;
    rock = false;
  }else{
    cl("unko")
  }
}

//program及びtextureを管理する静的クラス
class Material{
  //事前にロード(非同期)
  static async Init(){
    this.textures = [];
    this.programs = [];
    this.promises = [];//promise list

    const ALPHABETS_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const alphabets_lower = "abcdefghijklmnopqrstuvwxyz";
    //this.CreateCharacterTextures(ALPHABETS_UPPER);
    let char,path;
    for(let i = 0;i<ALPHABETS_UPPER.length;i++){
      char = ALPHABETS_UPPER[i];
      path = "resource/Fonts/alphabets/"+(i+65)+".png",
      this.promises.push(this.CreateTexture(char,path));
    }
    for(let i = 0;i<alphabets_lower.length;i++){
      char = alphabets_lower[i];
      path = "resource/Fonts/alphabets/"+(i+97)+".png",
      this.promises.push(this.CreateTexture(char,path));
    }
    await Promise.all(this.promises);
    await Promise.all(
      [
        this.CreateProgram("user","user.vert","user.frag"),
        this.CreateProgram("floor","floor.vert","floor.frag"),
        this.CreateProgram("ring","ring.vert","ring.frag"),
        this.CreateProgram("character","character.vert","character.frag"),
        this.CreateTexture("trap","resource/img/000.png"), 
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
  static async CreateTexture(char,path){
    const tex = new Texture(path); 
    await tex.Init();
    this.PushTexture(char,tex);
    return;
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
