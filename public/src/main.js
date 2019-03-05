let gl;
let glVAOExt;//gl拡張コンテキスト
let world;
let globalTime = 0;

/* ☆Entrypoint☆ */
(()=>{
  Init();
  Run();
})()

function Init(){
  gl = CreateGL();

  world = new World();
  world.Init();
}
function CreateGL(){
  const canvas = document.getElementById("canvas");
  canvas.width = 800;
  canvas.height= 600;
  gl = canvas.getContext("webgl");
  if(!gl){throw new Error("webGL is not available for your environment.")}
  glVAOExt = gl.getExtension('OES_vertex_array_object');
  if(!glVAOExt){throw new Error("webGL拡張がサポートされてない!")}

  return gl;
}

//main loop
function Run(){
  requestAnimationFrame(Run);
  world.Update();
  globalTime++;
}


