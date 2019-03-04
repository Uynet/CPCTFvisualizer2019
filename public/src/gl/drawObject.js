class DrawObject{
  constructor(buffers,program){
    this.buffers = buffers;
    this.program = program;
    this.VBO;
    this.transformMat = [];
    this.parent;//魂
  }
  Init(parent){
    this.parent = parent;
    this.buffers.forEach(buffer=>{
      buffer.SetAttr(this.program);

      if(buffer.attribute == "position")this.VBO = buffer;
    })
  }
  Draw(){
    this.VBO.Bind();
    //gl.bindBuffer(gl.ARRAY_BUFFER,this.vbo);
    this.program.Use();

    let a = globalTime*0.01;
    this.transformMat = [
      1,0,0,0,
      0,1,0,0,
      0,0,1,0,
      -this.parent.pos.x,-this.parent.pos.y,-this.parent.pos.z,1
    ];
    this.program.Uniform1f("time",globalTime);
    this.program.UniformMatrix4fv("transformMatrix",this.transformMat);


    gl.drawArrays(gl.TRIANGLES,0,3);
    gl.drawArrays(gl.TRIANGLES,1,3);
    //gl.bindBuffer(gl.ARRAY_BUFFER,null);
    this.VBO.UnBind();
  }
}