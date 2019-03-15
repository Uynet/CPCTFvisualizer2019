class TextBox{
  constructor(text){
    //this.textures = this.TextToCharacters(text);
  }
  TextToTextures(text){
    return [];
  }
  Update(){}
  Draw(){
    this.textures.forEach(e=>{
      e.Draw();
    });
  };
}
