class Buffer{
  //array:positiondata
  constructor(array){
    this.GLBuffer = gl.createBuffer();
    this.data;
    this.SetBuf(array)
  }
  SetBuf(array){
    this.Bind();
    this.data = new Float32Array(array); 
    gl.bufferData(gl.ARRAY_BUFFER,this.data,gl.STATIC_DRAW);
    this.UnBind();
  }
  Bind(){
    gl.bindBuffer(gl.ARRAY_BUFFER,this.GLBuffer);
  }
  UnBind(){
    gl.bindBuffer(gl.ARRAY_BUFFER,null);
  }
  //頂点属性に値をセット
  SetAttr(program,attribute,dim){
    const attr = program.GetAttr(attribute);
    if(attr == -1)console.error("頂点属性"+attribute+"は存在しません");
    this.Bind();
    gl.enableVertexAttribArray(attr);
    gl.vertexAttribPointer(attr,dim,gl.FLOAT,false,0,0);
    this.UnBind();
  }
}
