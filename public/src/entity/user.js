class User{
  /* userdata
   *  name
   *  id
   *  score
   *  icon_url
   */
  constructor(userdata){
    this.type = "user";
    this.pos = vec3(0,1,0);
    this.icon_url = userdata.icon_url;
    this.r = Math.random()*16+1;
    this.localTime = 0 + Rand(16000);
    let p = copy(this.pos);
    this.name = userdata.name;
    this.score= userdata.score;
    this.scoreText = new TextBox(this.score+"",p);
    this.nameText = new TextBox(this.name,p);
    this.cube = new Cube(p);
    this.scoreText.SetParent(this);
    this.nameText.SetParent(this);
    this.cube.SetParent(this);

    this.buffers;
    this.program = Material.GetProgram("user");
    this.primitiveType = "POINTS";
    this.Init();
  }
  async Init(){
    const uv = SquareUVArray();
    this.VBO = new Buffer([0,0,0],"position",3);
    this.UVAttr = new Buffer(uv,"uv",2);

    this.buffers = [
      this.VBO,
      this.UVAttr
    ]

    this.drawObject = new DrawObject(this.buffers,this.program);
    this.drawObject.Init(this);
    this.phi = Rand(3)
    this.theta = Rand(3)

    this.Texture = await Material.CreateTextureByURL(this.icon_url);
    this.cube.Init();
    this.cube.SetSize(Math.sqrt(this.score)/20.0);

    const self = this;
    this.drawObject.AddUniform("time","1f",()=>{return globalTime});
    this.drawObject.AddUniform("viewMatrix","mat4",()=>{return world.mainCamera.GetViewMatrix()});
    this.drawObject.AddUniform("projMatrix","mat4",()=>{return world.mainCamera.GetProjMatrix()});
    this.drawObject.AddUniform("transformMatrix","mat4",()=>{return GetTransformMatrix(self.pos)});
    this.drawObject.AddUniform("trap","texture",()=>{return self.Texture});

  }
  GetScore(score){
    this.score += score;
    this.cube.SetSize(Math.sqrt(this.score)/20.0);
    this.scoreText.SetTextTexture(this.score+"");
  }
  Update(){
    this.localTime++;
    let speed = 0.005/this.cube.size;
    this.phi += speed*0.36 * Math.sin(this.r);
    this.theta += speed * Math.sin(this.r);
    //適当に飛び回っとく
    this.pos = SphericalCoordToPosition(this.r,this.theta,this.phi);
    let pos = copy(this.pos);
    this.cube.SetPos(pos);
    pos.y -= this.cube.size*0.5;
    pos.y -= 0.7
    this.nameText.SetPos(pos);
    pos.y -= 0.7;
    this.scoreText.SetPos(pos);

    this.cube.Update();
    this.nameText.Update();
    this.scoreText.Update();
  }
  Draw(){
    //this.drawObject.Draw();dnt need to draw myself
    this.nameText.Draw();
    this.scoreText.Draw();
    this.cube.Draw();
  };
}
