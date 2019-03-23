class Texture{
  constructor(path){
    this.slot = -1;
    this.path = path;
    this.data;
    this.img = new Image();
  }
  Init(){
    return new Promise(resolve=>{
      let img = this.img;
      img.src = this.path;
      img.onload=()=>{
        //gl.activeTexture(gl.TEXTURE0+this.slot);
        this.data = gl.createTexture();
        assignSlot(this);
        this.Bind();
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        //this.UnBind();
        resolve();
      }
    })
  }
  SetSlot(slot){this.slot = slot;}
  Bind(){gl.bindTexture(gl.TEXTURE_2D,this.data);};
  UnBind(){
    gl.bindTexture(gl.TEXTURE_2D, null);
  };
}
