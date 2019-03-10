//これやっぱstaticにするか?
class Texture{
  constructor(path){
    this.slot = 0;//
    this.path = path;
    this.data;
    this.img = new Image();
  }
  Init(){
    return new Promise(resolve=>{
      this.onready = false;
      let img = this.img;
      img.src = this.path;
      img.onload=()=>{
        gl.activeTexture(gl.TEXTURE0+this.slot);
        this.data = gl.createTexture();
        this.Bind();
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.generateMipmap(gl.TEXTURE_2D);
        this.onready = true;
        //this.UnBind();
        resolve();
      }
    })
  }
  Bind(){
    gl.bindTexture(gl.TEXTURE_2D,this.data);
  };
  UnBind(){
    //gl.bindTexture(gl.TEXTURE_2D, null);
  };
}
