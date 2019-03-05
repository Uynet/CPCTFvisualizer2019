class Texture{
  constructor(){
    this.data = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D,this.data);
    const img = new Image("public/resource/img/000.png");
    img.onload=()=>{
      cl(img);
    }
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.UNSIGNED_BYTE,img);
  }
}
