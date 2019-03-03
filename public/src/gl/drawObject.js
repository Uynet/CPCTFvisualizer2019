class DrawObject{
  constructor(buffers,program){
    this.buffers = buffers;
    this.program = program;
    this.VBO;
  }
  Init(){
    this.buffers.forEach(buffer=>{
      buffer.SetAttr(this.program);

      if(buffer.attribute == "position")this.VBO = buffer;
    })
  }
  Draw(){
    this.VBO.Bind();
    //gl.bindBuffer(gl.ARRAY_BUFFER,this.vbo);
    this.program.Use();
    this.program.Uniform1f("time",globalTime);
    gl.drawArrays(gl.TRIANGLES,0,3);
    gl.drawArrays(gl.TRIANGLES,1,3);
    //gl.bindBuffer(gl.ARRAY_BUFFER,null);
    this.VBO.UnBind();
  }
}
