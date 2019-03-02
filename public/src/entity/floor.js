class Floor{
  constructor(){
    this.vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,this.vbo);
    this.vertices = new Float32Array([
      0.0 , 0.5 , 0.0 ,
      0.5 , 0.0 , 0.0 ,
      -0.5 , 0.0 , 0.0 ,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER,this.vertices,gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER,null);

    this.program = gl.createProgram();
    const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    const vertShader = gl.createShader(gl.VERTEX_SHADER);

    const frag = fetch("src/shader/main.frag")
      .then(response=>response.text())
      .then(text=>{
        gl.attachShader(this.program,fragShader);
        gl.shaderSource(fragShader,text);
        gl.compileShader(fragShader);
        fetch("src/shader/main.vert")
          .then(response=>response.text())
          .then(text=>{
            gl.attachShader(this.program,vertShader);
            gl.shaderSource(vertShader,text);
            gl.compileShader(vertShader);

            gl.linkProgram(this.program);
            gl.useProgram(this.program);

            const attr = gl.getAttribLocation(this.program,"position");
            gl.enableVertexAttribArray(attr);
            gl.bindBuffer(gl.ARRAY_BUFFER,this.vbo);
            gl.vertexAttribPointer(attr,3,gl.FLOAT,false,0,0);
            Run();
          })
      });
  }

  Draw(){
    gl.bindBuffer(gl.ARRAY_BUFFER,this.vbo);
    gl.useProgram(this.program);
    gl.drawArrays(gl.TRIANGLES,0,3);
    gl.bindBuffer(gl.ARRAY_BUFFER,null);
  }
}
