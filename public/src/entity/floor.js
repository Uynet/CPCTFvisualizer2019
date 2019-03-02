class Floor{
  constructor(){}
  async Init(){
    this.vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,this.vbo);
    this.vertices = new Float32Array([
      -0.5 , 0.5 , 0.0 ,
      0.5 , 0.5 , 0.0 ,
      -0.5 , 0.0 , 0.0 ,
      0.5 , 0.0 , 0.0 ,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER,this.vertices,gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER,null);

    this.program = new Program("main.vert","main.frag");
    await this.program.Init(this.vbo);
  };
  Draw(){
    gl.bindBuffer(gl.ARRAY_BUFFER,this.vbo);
    this.program.Use();
    gl.drawArrays(gl.TRIANGLES,0,3);
    gl.drawArrays(gl.TRIANGLES,1,3);
    gl.bindBuffer(gl.ARRAY_BUFFER,null);
  }
}
