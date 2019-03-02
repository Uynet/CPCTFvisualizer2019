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
          gl.compileShader(fragShader);
          fetch("src/shader/"+this.vertpath)
          .then(response=>response.text())
            .then(text=>{
              gl.attachShader(this.shaderProgram,vertShader);
              gl.shaderSource(vertShader,text);
              gl.compileShader(vertShader);

              gl.linkProgram(this.shaderProgram);
              gl.useProgram(this.shaderProgram);

              this.SetUpAttr(VBO);
              resolve();
            })
        });
    });
  }
  SetUpAttr(VBO){
    const attr = gl.getAttribLocation(this.shaderProgram,"position");
    gl.enableVertexAttribArray(attr);
    gl.bindBuffer(gl.ARRAY_BUFFER,VBO);
    gl.vertexAttribPointer(attr,3,gl.FLOAT,false,0,0);
  }
  Use(){
    gl.useProgram(this.shaderProgram);
  }
}
