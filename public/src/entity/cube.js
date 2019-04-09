//立方体
//とりあえずringをだしている
class Cube{
  constructor(pos){
    this.pos = pos;
    this.size= 0.75;
    this.buffers;
    this.program = Material.GetProgram("cube");
    this.parent;
    this.primitiveType = "ELEMENTS";
    this.OnReady = false;
    //this.Init();
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
    function ring(radius, width, segments) {
      let pos = [];
      let idx = [];
      pos = [
        0,0,0,//0
        1,0,0,//1
        0,1,0,//2
        1,1,0,//3
        0,0,1,//4
        1,0,1,//5
        0,1,1,//6
        1,1,1,//7
      ];
      for(let i=0;i<pos.length;i++){
        pos[i]-=0.5;
      }
      idx=[
        0,1,2, 1,2,3,
        4,5,6, 5,6,7,
        0,1,4, 1,4,5,
        2,3,6, 3,6,7,
        0,2,4, 2,4,6,
        1,3,5, 3,5,7,
      ]

      return [pos, idx];
    }
    const [vertices, index] = ring(this.radius, this.width, this.segments);

    // const vertices = SquareArray(1.0);//★頂点データ
    // const index = [0,1,2,1,2,3];      //★index
    const uv = [ 
      /*
      0,0 ,1,0 , 0,1, 1,1 ,
      0,0 ,1,0 , 0,1, 1,1 ,
      0,0 ,1,0 ,
      0,1, 1,1 ,
      0,0 ,1,0 ,
      0,1, 1,1 ,
      */
    ]

    this.buffers = [
      this.VBO = new Buffer(vertices,"position",3),
      //this.UVAttr = new Buffer(uv,"uv",2),
    ]
    const self = this;
    this.drawObject = new DrawObject(this.buffers,this.program);
    this.drawObject.SetIBO(index);
    //uniform変数名、型、代入する値を返す関数
    this.drawObject.AddUniform("time","1f",()=>{return globalTime});
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
