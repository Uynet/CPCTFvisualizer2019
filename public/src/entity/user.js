class User{
  /* userdata
   *  name
   *  id
   *  score
   *  icon_url
   */
  constructor(userdata){
    this.type = "user";
    this.id = userdata.id;
    this.pos = vec3(0,1,0);
    this.icon_url = userdata.icon_url;
    if(this.icon_url === undefined)this.icon_url = "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
    this.r = Math.random()*16+5;
    this.localTime = 0 + Rand(16000);
    let p = copy(this.pos);
    this.name = userdata.name;
    this.score= userdata.score;
    this.scoreText = new TextBox(this.score+"点",p);
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
  SetCubeSize(){
    this.cube.SetSize(Math.sqrt(this.score+10)/20.0);
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
    this.SetCubeSize();

    const self = this;
    this.drawObject.AddUniform("time","1f",()=>{return self.localTime});
    this.drawObject.AddUniform("viewMatrix","mat4",()=>{return world.mainCamera.GetViewMatrix()});
    this.drawObject.AddUniform("projMatrix","mat4",()=>{return world.mainCamera.GetProjMatrix()});
    this.drawObject.AddUniform("transformMatrix","mat4",()=>{return GetTransformMatrix(self.pos)});
    this.drawObject.AddUniform("trap","texture",()=>{return self.Texture});

  }
  GetScore(score){
    this.score += score;
    score = Math.floor(this.score);
    this.SetCubeSize();
    this.scoreText.SetTextTexture(score + "点");
  }
  Update(){
    this.localTime++;
    let speed = 0.005;//this.cube.size;
    this.phi += speed*0.36 * Math.sin(this.r);
    this.theta += speed * Math.sin(this.r);
    //適当に飛び回っとく
    this.pos = SphericalCoordToPosition(this.r,this.theta,this.phi);
    let pos = copy(this.pos);
    this.cube.SetPos(pos);
    const side = normalize(cross(world.mainCamera.forward,world.mainCamera.up));
    let up = normalize(cross(world.mainCamera.forward, side));

    up = scala(this.cube.size,up);
    this.scoreText.SetPos(add(pos,up));
    this.nameText.SetPos(sub(pos,up));

    this.cube.Update();
    this.nameText.Update();
    this.scoreText.Update();
  }
  Draw(){
    //this.drawObject.Draw();dnt need to draw myself
    this.nameText.Draw();
    this.cube.Draw();
    this.scoreText.Draw();
  };
}
