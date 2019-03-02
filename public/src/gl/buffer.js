class Buffer{
  constructor(){
    this.GLBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,this.GLBuffer);
    this.data= new Float32Array([
      -0.5 , 0.5 , 0.0 ,
      0.5 , 0.5 , 0.0 ,
      -0.5 , 0.0 , 0.0 ,
      0.5 , 0.0 , 0.0 ,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER,this.data,gl.STATIC_DRAW);
    this.UnBind();
  }
  Bind(){
    gl.bindBuffer(gl.ARRAY_BUFFER,this.GLBuffer);
  }
  UnBind(){
    gl.bindBuffer(gl.ARRAY_BUFFER,null);
  }
}
