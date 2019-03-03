class Program{
  constructor(vertpath,fragpath){
    this.vertpath = vertpath;
    this.fragpath= fragpath;
  }
  async Init(VBO){
    return new Promise(resolve=>{
      this.shaderProgram = gl.createProgram();
      const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
      const vertShader = gl.createShader(gl.VERTEX_SHADER);

      const frag = fetch("src/shader/"+this.fragpath)
      .then(response=>response.text())
        .then(text=>{
          gl.attachShader(this.shaderProgram,fragShader);
          gl.shaderSource(fragShader,text);
          this.Compile(fragShader);
          fetch("src/shader/"+this.vertpath)
          .then(response=>response.text())
            .then(text=>{
              gl.attachShader(this.shaderProgram,vertShader);
              gl.shaderSource(vertShader,text);
              this.Compile(vertShader);

              gl.linkProgram(this.shaderProgram);
              gl.useProgram(this.shaderProgram);


              resolve();
            })
        });
    });
  }
  Compile(shader){
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert('!コンパイルエラー!\n' +
        "--------------------------\n"+
        gl.getShaderInfoLog(shader)+"\n"
    );
      gl.deleteShader(shader);
    }
  }
  
  Uniform1f(name,value){
    this.Use();
    let location = gl.getUniformLocation(this.shaderProgram,name);
    gl.uniform1f(location, value);
    this.Release();
  }

  Use(){
    gl.useProgram(this.shaderProgram);
  }
  Release(){
    //gl.useProgram(null);
  }
  GetAttr(attribute){
    return gl.getAttribLocation(this.shaderProgram,attribute);
  }
}
