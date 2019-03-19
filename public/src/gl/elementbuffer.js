class ElementBuffer{// extends Buffer{
  constructor(array){
    //super()
    let unko =  gl.createBuffer();
    this.GLBuffer = unko;
    this.data;
    this.array = array;
    this.SetBuffer(array)
  }
  SetBuffer(array){
    this.Bind();
    this.data = new Int16Array(array);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,this.data,gl.STATIC_DRAW);
    this.UnBind();
  }
  Bind(){
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.GLBuffer);
  }
  UnBind(){
    //gl.bindBuffer(gl.ARRAY_BUFFER,null);
  }
}
