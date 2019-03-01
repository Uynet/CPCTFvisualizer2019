let gl;

//☆Entrypoint☆
(()=>{
  Init();
})()

function Init(){
  const canvas = document.getElementById("canvas");
  canvas.width = 400;
  canvas.height= 400;
  gl = canvas.getContext("webgl");
  if(!gl){throw new Error("webGL is not available for your environment.")}
  let vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
  let buffer = new Float32Array([
    0.0 , 0.5 , 0.0 ,
    0.5 , 0.0 , 0.0 ,
   -0.5 , 0.0 , 0.0 ,
  ]);
  gl.bufferData(gl.ARRAY_BUFFER,buffer,gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER,null);
  const program = gl.createProgram();
  const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
  const vertShader = gl.createShader(gl.VERTEX_SHADER);

  const frag = fetch("src/shader/main.frag")
    .then(response=>response.text())
    .then(text=>{
      gl.attachShader(program,fragShader);
      gl.shaderSource(fragShader,text);
      gl.compileShader(fragShader);
      fetch("src/shader/main.vert")
        .then(response=>response.text())
        .then(text=>{
          gl.attachShader(program,vertShader);
          gl.shaderSource(vertShader,text);
          gl.compileShader(vertShader);

          gl.linkProgram(program);
          gl.useProgram(program);

          const attr = gl.getAttribLocation(program,"position");
          gl.enableVertexAttribArray(attr);
          gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
          gl.vertexAttribPointer(attr,3,gl.FLOAT,false,0,0);
          Run();
        })
    });

}

//main loop
function Run(){
  requestAnimationFrame(Run);
  //cl("running")
  gl.clearColor(0.0,0.0,0.0,1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES,0,3);
  gl.flush();
}


