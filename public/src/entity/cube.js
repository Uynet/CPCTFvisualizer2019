//立方体
//とりあえずringをだしている
class Cube{
  constructor(pos){
    this.type = "cube";
    this.pos = pos;
    this.size= 0.75;
    this.buffers;
    this.program = Material.GetProgram("cube");
    this.parent;
    this.primitiveType = "ELEMENTS";
    //this.primitiveType = "TRIANGLES";
    this.OnReady = false;
    //this.Init();
    this.accel = 0;//エフェクト中
  }
  SetSize(size){
    this.size = size
  }
  SetPos(pos){
    this.pos = copy(pos);
  }
  SetParent(parent){
    this.parent = parent;
  }
  Init(){
    function cube() {
      let pos = [];
      pos = [
        //1
        0,0,0,//0
        1,0,0,//1
        0,1,0,//2
        1,1,0,//3
        //2
        0,0,1,
        1,0,1,
        0,1,1,
        1,1,1,
        //3
        0,0,0,
        1,0,0,
        0,0,1,
        1,0,1,
        //4
        0,1,0,
        1,1,0,
        0,1,1,
        1,1,1,
        //5
        0,0,0,
        0,1,0,
        0,0,1,
        0,1,1,
        //6
        1,0,0,
        1,1,0,
        1,0,1,
        1,1,1,
      ];
      for(let i=0;i<pos.length;i++){
        pos[i]-=0.5;
      }
      return pos;
    }
    const vertices = cube();
    const index = [
      0,1,2, 1,3,2,
      4,5,6, 5,7,6,
      8,9,10, 9,11,10,
      12,13,14, 13,15,14,
      16,17,18, 17,19,18,
      20,21,22, 21,23,22,
    ];      //★index
    const uv = [ 
      0,0 ,1,0 , 0,1, 1,1 ,
      0,0 ,1,0 , 0,1, 1,1 ,
      0,0 ,1,0 , 0,1, 1,1 ,
      0,0 ,1,0 , 0,1, 1,1 ,
      0,0 ,1,0 , 0,1, 1,1 ,
      0,0 ,1,0 , 0,1, 1,1 ,
    ]

    this.buffers = [
      this.VBO = new Buffer(vertices,"position",3),
      this.UVAttr = new Buffer(uv,"uv",2),
    ]
    const self = this;
    this.drawObject = new DrawObject(this.buffers,this.program);
    this.drawObject.SetIBO(index);
    //uniform変数名、型、代入する値を返す関数
    this.drawObject.AddUniform("time","1f",()=>{return self.parent.localTime});
    this.drawObject.AddUniform("accel","1f",()=>{return self.accel});
    this.drawObject.AddUniform("viewMatrix","mat4",()=>{return world.mainCamera.GetViewMatrix()});
    this.drawObject.AddUniform("projMatrix","mat4",()=>{return world.mainCamera.GetProjMatrix()});
    this.drawObject.AddUniform("trap","texture",()=>{return self.parent.Texture});
    this.drawObject.AddUniform("transformMatrix","mat4",()=>{return GetTransformMatrix(self.pos)});
    this.drawObject.AddUniform("size","1f",()=>{return self.size});

    this.drawObject.Init(this);
    this.OnReady = true;
  };
  Update(){
  }
  Draw(){
    if(this.OnReady)this.drawObject.Draw();
  }
}
