let gl;
let world;

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

  world = new World();
  world.Init();
}

//main loop
function Run(){
  requestAnimationFrame(Run);
  world.Draw();
}


