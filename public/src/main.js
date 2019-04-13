let gl;
let websocket;
let glVAOExt;//gl拡張コンテキスト
let world;
let canvas;
let globalTime = 0;
let isPause = false;

let frame = [
  "[*ˊ-ˋ*]",
];
/* ☆Entrypoint☆ */
(()=>{
  Init();
  Run();
})()

function Init(){
  gl = CreateGL();
  websocket = new Socket();
  websocket.listen(); 
  Audio.Init();
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
function Clock(){
  //CPCTF終了19:30?
  let today = new Date();
  //today.setHours(19,30,0,0);
  today.setHours(23,59,59,99);
  let limit = today.getTime();
  let now = new Date().getTime();
  let ms= limit-now;
  let hh = String(Math.floor(ms / 3600000) + 100).substring(1);
  let mm = String(Math.floor((ms - hh * 3600000)/60000)+ 100).substring(1);
  let ss = String(Math.floor((ms - hh * 3600000 - mm * 60000)/1000)+ 100).substring(1);
  let sss= String(ms%1000+1000).substring(1,3);
  //if(sss>95)ss=ss[0]+"i";
  //if(sss>97)ss=ss[0]+"l";
  if(ms<0){
    document.getElementById("main").style.color = "#fd107a";
    hh = mm = ss = sss = "00";
  }
  let text =  "["
    +hh+":"+mm+":"+ss + ":" + sss
   +"]";
  document.getElementById("main").innerHTML = text;
}
function TitileAnimation(){
  let title = document.getElementById("title");
  let t = 8;
  if(globalTime%t==0){
    let s = (globalTime/t)%frame.length;
    title.innerHTML = frame[s];
  }
}

//main loop
function Run(){
  requestAnimationFrame(Run);
  Clock();
  TitileAnimation();
  if(!isPause){
    world.Update();
    globalTime++;
    if(K.s()&& K.w()) isPause = true;
  }else{
    Pause();
  }
}


