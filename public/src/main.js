let gl;
let websocket;
let glVAOExt;//gl拡張コンテキスト
let world;
let canvas;
let globalTime = 0;
let isPause = false;
let isVisualizerReady = false;

let frame = [
  "[*ˊ-ˋ*]",
];
const po = ()=>{cl("HELLO CPCTF")}
/* ☆Entrypoint☆ */
(()=>{
  Init().then(Run);
})()

async function Init(){
  return new Promise(resolve=>{
    gl = CreateGL();
    websocket = new Socket();
    websocket.listen();
    world = new World();
    world.Init();
    Audio.Init();
    Audio.Load().then(resolve)
  });
}
function CreateGL(){
  canvas = document.getElementById("canvas");
  canvas.width = 800;
  canvas.height= 600;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const rate = 1.0;
  canvas.width = w / rate;
  canvas.height = h / rate;
  gl = canvas.getContext("webgl");
  canvas.style.width = w;
  canvas.style.height = h;
  //gl.viewport(0,0,canvas.width, canvas.height);

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
//1st,2nd,3rd,4th,...
function Order(n){
  return "#" + n;
   switch(n%10){
     case 1 : return n+"st";
     case 2 : return n+"nd";
     case 3 : return n+"rd";
     default :return  n +"th";
    }
}

function Ranking(){
  let rankingDOM = document.getElementById("ranking");
  rankingDOM.classList.add("container");
  let userList = world.GetSortedUserList();
  let rank = 1;//
  if(globalTime %500 ==10){
    //DOM全消し
    let usernameDOMList = rankingDOM.children; 
    for(let i = 0;i<usernameDOMList.length;){
      rankingDOM.removeChild(usernameDOMList[i]);
    }
    //更新
    userList.forEach(user => {
      let username = user.name;
      let userDOM = document.createElement("div");
      let usernameDOM = document.createElement("div");
      let ptsDOM = document.createElement("div");
      usernameDOM.innerText = Order(rank++) + "     :    " + username;
      //usernameDOM.classList.add('float-left');
      ptsDOM.innerText = user.score + "点";
      ptsDOM.classList.add('align-self-end');
      ptsDOM.classList.add('col-sm-3');
      usernameDOM.classList.add("col-sm-9");
      userDOM.classList.add("row");
      //userDOM.classList.add("row");

      userDOM.appendChild(usernameDOM);
      userDOM.appendChild(ptsDOM);
      rankingDOM.appendChild(userDOM);
      //if(rank>=5)userDOM.style.fontSize = 20; 
      //if(rank>=12)userDOM.style.fontSize = 16; 
    })
  }
}
//ミリセカンド秒をいい感じのタイマーにする
function ParceMsToTimmer(ms){
  let hh = String(Math.floor(ms / 3600000) + 100).substring(1);
  let mm = String(Math.floor((ms - hh * 3600000)/60000)+ 100).substring(1);
  let ss = String(Math.floor((ms - hh * 3600000 - mm * 60000)/1000)+ 100).substring(1);
  let sss= String(ms%1000+1000).substring(1,3);
  let text =  hh+":"+mm+":"+ss + ":" + sss;
  //if(sss==95){document.getElementById("main").innerHTML = "" ;return;}
  //if(sss==97){document.getElementById("main").innerHTML = "" ;return;}
  return text;
}
function Clock(){
  //CPCTF終了19:30?
  let LimitDate= new Date();
  let StartDate= new Date();
  LimitDate.setHours(19,30,0,0);
  StartDate.setHours(13,30,0,0);
  //today.setHours(23,59,59,99);
  let limit = LimitDate.getTime();
  let start = StartDate.getTime();
  let now = new Date().getTime();

  let limit_ms = limit-now;//終了まで
  let start_ms = start-now;//開始まで
  let text = "[TimeLimit]";
  if(start_ms>0)
    //開始前
    text = "開始まで:[" + ParceMsToTimmer(start_ms) + "]";
  else if(limit_ms>0){
    //競技中
    text = "のこり[" + ParceMsToTimmer(limit_ms) + "]";
  }else{
    //終了後
    document.getElementById("main").style.color = "#fd107a";
    text = "CTF is Over!";
  }
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
  isVisualizerReady = true;
  requestAnimationFrame(Run);
  Clock();
  Ranking();
  //TitileAnimation();
  if(!isPause){
    world.Update();
    globalTime++;
    //if(K.s()&& K.w()) isPause = true;
  }else{
    Pause();
  }
}