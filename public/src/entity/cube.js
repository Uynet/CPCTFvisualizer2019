//立方体
//とりあえずringをだしている
class Cube{
  constructor(pos, radius = 1, width = 0.3, segments = 32){
    this.pos = pos;
    this.radius = radius;
    this.width = width;
    this.segments = segments;
    this.buffers;
    this.program = Material.GetProgram("cube");
    const self = this;
    this.primitiveType = "ELEMENTS";
    this.Init();
    //uniform変数名、型、代入する値を返す関数
    this.drawObject.AddUniform("time","1f",()=>{return globalTime});
    this.drawObject.AddUniform("viewMatrix","mat4",()=>{return world.mainCamera.GetViewMatrix()});
    this.drawObject.AddUniform("projMatrix","mat4",()=>{return world.mainCamera.GetProjMatrix()});
    this.drawObject.AddUniform("trap","texture",()=>{return Material.GetTexture("trap")});
    this.drawObject.AddUniform("transformMatrix","mat4",()=>{return GetTransformMatrix(self.pos)});
  }
  Init(){
    function ring(radius, width, segments) {
      const pos = [];
      const idx = [];

      for (let i = 0; i < segments; i++) {
        const rad = Math.PI * 2 / segments * i;
        const x = radius * Math.cos(rad);
        const z = radius * Math.sin(rad);
        pos.push(x, -width / 2, z);
        pos.push(x, width / 2, z);
      }
      for (let i = 0; i < segments; i++) {
        const a = 2 * i;
        const b = 2 * i + 1;
        const c = (2 * i + 2) % (2 * segments);
        const d = (2 * i + 3) % (2 * segments);
        idx.push(a, b, d);
        idx.push(a, d, c);
      }
      return [pos, idx];
    }
    const [vertices, index] = ring(this.radius, this.width, this.segments);

    // const vertices = SquareArray(1.0);//★頂点データ
    // const index = [0,1,2,1,2,3];      //★index
    //const uv = SquareUVArray();

    this.buffers = [
      this.VBO = new Buffer(vertices,"position",3),
      //this.UVAttr = new Buffer(uv,"uv",2),
    ]

    this.drawObject = new DrawObject(this.buffers,this.program);
    this.drawObject.SetIBO(index);
    this.drawObject.Init(this);
  };
  Update(){
  }
  Draw(){
    this.drawObject.Draw();
  }
}
