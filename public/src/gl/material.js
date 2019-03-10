class Material{
  static async Init(){
    this.textures = [];

    this.floorProgram = new Program("floor.vert","floor.frag");
    await this.floorProgram.Init();

    //const trapTexture = new Texture("000.png"); 
    const trapTexture = new Texture("resource/Fonts/hira/12413.png"); 
    await trapTexture.Init();
    this.textures.push(trapTexture);

    this.userProgram = new Program("user.vert","user.frag");
    await this.userProgram.Init();
    //this.userProgram.AddTexture(trapTexture);
    
  }
  //これなかなかにクソ
  static GetTexture(index){
    return this.textures[index];
  }
  AddTexture(texture){
    this.textures.push(texture);
  }
}
