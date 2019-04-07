class User{
  constructor(userdata){
    this.type = "user";
    this.pos = vec3(0,1,0);
    this.r = Math.random()*16+1;
    this.localTime = 0 + Rand(16000);
    let p = copy(this.pos);
    this.name = userdata.name;
    this.score= userdata.score;
    this.scoreText = new TextBox(this.score+"",p);
    this.nameText = new TextBox(this.name,p);
    this.scoreText.SetParent(this);
    this.nameText.SetParent(this);
    this.cube = new Cube(p);

    this.children = [];
    this.children.push(this.socreText);
    this.children.push(this.nameText);
    this.children.push(this.cube);


    this.buffers;
    this.program = Material.GetProgram("user");
    const self = this;
    this.primitiveType = "POINTS";
    this.Init();
    this.drawObject.AddUniform("time","1f",()=>{return globalTime});
    this.drawObject.AddUniform("viewMatrix","mat4",()=>{return world.mainCamera.GetViewMatrix()});
    this.drawObject.AddUniform("projMatrix","mat4",()=>{return world.mainCamera.GetProjMatrix()});
    this.drawObject.AddUniform("transformMatrix","mat4",()=>{return GetTransformMatrix(self.pos)});
    this.drawObject.AddUniform("trap","texture",()=>{return Material.GetTexture("trap")});
    /*
    this.drawObject.AddUniform("billMatrix","mat4",()=>{
      const po = 
      LockAt(
        self.pos,//eye
        sub(world.mainCamera.pos , self.pos),//for
        vec3(0,1,0)//up
      )
      return po;
    });
    */
  }
  Init(){
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
  }

  GetScore(score){
    cl(this.score);
    this.score += score;
    this.cube.SetSize(Math.sqrt(this.score)/40.0);
  }
  Update(){
    this.localTime++;
    let speed = 0.005/this.cube.size;
    this.phi += speed*0.36 * Math.sin(this.r);
    this.theta += speed * Math.sin(this.r);
    //適当に飛び回っとく
    this.pos.x = this.r * Math.sin(this.phi)*Math.sin(this.theta);
    this.pos.y = this.r * Math.cos(this.phi);
    this.pos.z = this.r * Math.sin(this.phi)*Math.cos(this.theta);

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
    this.drawObject.Draw();
    this.nameText.Draw();
    this.scoreText.Draw();
    this.cube.Draw();
  };
}
