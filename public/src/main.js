let gl;
let websocket;
let glVAOExt;//gl拡張コンテキスト
let world;
let canvas;
let globalTime = 0;
let isPause = false;

/* ☆Entrypoint☆ */
(()=>{
  Init();
  Run();
})()

function Init(){
  gl = CreateGL();
  websocket = new Socket();
  websocket.listen();

  world = new World();
  world.Init();
}
function CreateGL(){
  canvas = document.getElementById("canvas");
  canvas.width = 800;
  canvas.height= 600;
  gl = canvas.getContext("webgl");

  //αblending
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.enable(gl.DEPTH_TEST);


  if(!gl){throw new Error("webGL is not available for your environment.")}
  glVAOExt = gl.getExtension('OES_vertex_array_object');
  if(!glVAOExt){throw new Error("webGL拡張がサポートされてない!")}

  return gl;
}

function Pause(){
  if(K.right()){
    if(K.left()){
      isPause = false;
    }
  }
}
//main loop
function Run(){
  requestAnimationFrame(Run);
  if(!isPause){
    world.Update();
    globalTime++;
    if(K.s()){
      if(K.w()){
        cl("unko")
        isPause = true;
      }
    }
  }else{
    Pause();
  }
}


