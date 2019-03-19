class Buffer{
  //array:positiondata
  constructor(array,attribute,dim,type){
    this.attribute = attribute;
    let unko =  gl.createBuffer();
    this.GLBuffer = unko;
    //this.VAO = glVAOExt.createVertexArrayOES();
    this.data;
    this.dim = dim;
    this.array = array;
    this.type = type;
    this.SetBuffer(array)
  }
  SetBuffer(array){
    gl.bindBuffer(gl.ARRAY_BUFFER,this.GLBuffer);
    this.data = new Float32Array(array);
    gl.bufferData(gl.ARRAY_BUFFER,this.data,gl.STATIC_DRAW);
    this.UnBind();
  }
  SetProgram(p){
    this.program = p;
  }
  Bind(){
    gl.bindBuffer(gl.ARRAY_BUFFER,this.GLBuffer);
    this.SetAttr(this.program);
  }
  UnBind(){
    //gl.bindBuffer(gl.ARRAY_BUFFER,null);
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
    gl.bindBuffer(gl.ARRAY_BUFFER,this.GLBuffer);
    gl.enableVertexAttribArray(attr);
    gl.vertexAttribPointer(attr,this.dim,gl.FLOAT,false,0,0);
    this.UnBind();
  }
}
