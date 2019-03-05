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
  SetUniform(){
    //TODO uniformlistをつくる
    let tex = this.parent.trapTexture;
    this.program.Uniform1f("time",globalTime);
    this.program.UniformTexture("trap",tex);
    this.program.UniformMatrix4fv("transformMatrix",this.transformMat);
    this.program.UniformMatrix4fv("projMatrix",this.projMat);
    this.program.UniformMatrix4fv("viewMatrix",this.viewMat);
  }
  Draw(){
    this.VBO.Bind();
    this.program.Use();

    this.transformMat = GetTransformMatrix(this.parent.pos);
    this.viewMat = world.mainCamera.GetViewMatrix();
    this.projMat = world.mainCamera.GetProjMatrix();

    this.SetUniform();

    gl.drawArrays(gl.TRIANGLES,0,3);
    gl.drawArrays(gl.TRIANGLES,1,3);
    this.VBO.UnBind();
  }
}
