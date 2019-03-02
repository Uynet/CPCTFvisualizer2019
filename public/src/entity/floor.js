class Floor{
  constructor(){}
  async Init(){
    this.VBO = new Buffer();

    this.program = new Program("main.vert","main.frag");
    await this.program.Init(this.VBO);
  };
  Draw(){
    this.VBO.Bind();
    //gl.bindBuffer(gl.ARRAY_BUFFER,this.vbo);
    this.program.Use();
    gl.drawArrays(gl.TRIANGLES,0,3);
    gl.drawArrays(gl.TRIANGLES,1,3);
    //gl.bindBuffer(gl.ARRAY_BUFFER,null);
    this.VBO.UnBind();
  }
}
