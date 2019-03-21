class DrawObject{
  constructor(buffers,program){
    this.buffers = buffers;
    this.program = program;
    this.VBO;
    this.index;
    this.IBO;
    this.transformMat = [];
    this.parent;//魂
    this.uniformList = [];
    this.primitiveType = "TRIANGLES";
  }
  Init(parent){
    this.parent = parent;
    this.primitiveType = parent.primitiveType;
    this.buffers.forEach(buffer=>{
      buffer.SetProgram(this.program);
      buffer.SetAttr(this.program);
      if(buffer.attribute == "position")this.VBO = buffer;
      if(buffer.attribute == "uv")this.UV = buffer;
    })
  }
  SetIBO(indexArray){
    this.index = indexArray;
    this.IBO  = new ElementBuffer(indexArray);
  }
  SendUniform(){
    this.uniformList.forEach(e=>{
      e.SendUniform(this.program);
    })
  }
  AddUniform(name,type,getter){
    const uniform = new Uniform(name,type,getter);
    this.uniformList.push(uniform);
  }
  Draw(){
    this.program.Use();
    this.VBO.Bind();

    this.SendUniform();

    switch(this.primitiveType){
      case "ELEMENTS" :
        this.IBO.Bind();
        gl.drawElements(gl.TRIANGLES,this.index.length,gl.UNSIGNED_SHORT,0);
        break;
      case "TRIANGLES" :
        gl.drawArrays(gl.TRIANGLES,0,3);
        gl.drawArrays(gl.TRIANGLES,1,3);
        break;
      case "POINTS" : 
        gl.drawArrays(gl.POINTS,0,1);
        break;
      case "LINES" : 
        this.IBO.Bind();
        //gl.drawElements(gl.LINE_LOOP,this.index.length,gl.UNSIGNED_SHORT,0);
        gl.drawElements(gl.LINE_STRIP,this.index.length,gl.UNSIGNED_SHORT,0);
        break;
      default : alert(this.primitiveType); 
    }
    //this.VBO.UnBind();
  }
}
class Uniform{
  constructor(name,type,getter){
    this.name = name;
    this.type = type;
    this.getter = getter;
  }
  SendUniform(program){
    switch(this.type){
      case "1f" : program.Uniform1f(this.name,this.getter()); break;
      case "mat4" : program.UniformMatrix4fv(this.name,this.getter());break;
      case "texture" : program.UniformTexture(this.name,this.getter());break;
      default : cl("うんこもりもり森鴎外");
    }
  }
}
