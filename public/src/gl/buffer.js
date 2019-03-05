class Buffer{
  //array:positiondata
  constructor(array,attribute,dim){
    this.attribute = attribute;
    this.GLBuffer = gl.createBuffer();
    this.VAO = glVAOExt.createVertexArrayOES();
    this.data;
    this.dim = dim;
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
  /*
  BindVAO(){
    glVAOExt.bindVertexArrayOES(this.VAO);
  }
  UnBindVAO(){
    glVAOExt.bindVertexArrayOES(null);
  }
  */
  //頂点属性に値をセット
  SetAttr(program){
    const attr = program.GetAttr(this.attribute);
    if(attr == -1)console.error("頂点属性"+this.attribute+"は存在しません");
    this.Bind();
    gl.enableVertexAttribArray(attr);
    gl.vertexAttribPointer(attr,this.dim,gl.FLOAT,false,0,0);
    this.UnBind();
  }
}
