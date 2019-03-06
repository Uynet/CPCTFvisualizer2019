class Material{
  static async Init(){
    this.textures = [];

    this.floorProgram = new Program("floor.vert","floor.frag");
    await this.floorProgram.Init();

    const trapTexture = new Texture("000.png"); 
    await trapTexture.Init();
    this.textures.push(trapTexture);
    this.floorProgram.AddTexture(trapTexture);
  }
}
