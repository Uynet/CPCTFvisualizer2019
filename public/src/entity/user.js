class User{
  constructor(name){
    this.pos = vec3(0,1,0);
    this.name = name;
    this.buffers;
    this.program = Material.userProgram;
    this.localTime  =0;
    this.Init();
  }
  Init(){
    let size = Math.random();
    const vertices =  [
        -size ,+size , 0.0 ,//左上
        +size ,+size , 0.0 ,//右上
        -size ,-size , 0.0 ,//左下
        +size ,-size , 0.0 ,//右下
      ];
    const uv = SquareUVArray();
    this.VBO = new Buffer(vertices,"position",3);
    this.UVAttr = new Buffer(uv,"uv",2);

    this.buffers = [
      this.VBO,
      this.UVAttr
    ]

    this.drawObject = new DrawObject(this.buffers,this.program);
    this.drawObject.Init(this);
  }

  Update(){
    this.localTime++;
    this.pos.x = Math.sin(this.localTime*0.01)*8.;
    this.pos.z = Math.cos(this.localTime*0.01)*8.;
  }
  Draw(){
    this.drawObject.Draw();
  };
}
