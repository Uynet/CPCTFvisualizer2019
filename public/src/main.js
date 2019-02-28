//boot
let gl;
(()=>{
  const canvas = document.getElementById("canvas");
  canvas.width = 400;
  canvas.height= 400;
  gl = canvas.getContext("webgl");
  if(!gl){throw new Error("webGL is not available for your environment.")}
  Run();
})()

function Run(){
  requestAnimationFrame(Run);
  //cl("running")
  gl.clearColor(0.0,0.0,0.0,0.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.flush();
}


