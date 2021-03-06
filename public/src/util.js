const PI = Math.PI;
/*meta*/
Array.prototype.Last = function(){
  if(this.length == 0){
    return undefined;
  }
  else{ return this[this.length-1];
  }
}
//配列から要素を削除
Array.prototype.remove = function(e){
  let i = this.indexOf(e);
  if(i == -1) return;//そんな要素は無い
  this.splice(i,1);
}
Array.prototype.maxIndex = function(){
  let max = this[0];
  let maxI = 0;
  for(let i = 1;i<this.length;i++){
    if(max < this[i]){
      max = this[i];
      maxI = i;
    }
  }
  return maxI;
}
Array.prototype.minIndex = function(){
  let min = this[0];
  let minI = 0;
  for(let i = 1;i<this.length;i++){
    if(min > this[i]){
      min = this[i];
      minI = i;
    }
  }
  return minI;
}


const DIR = {
  UP : 0,
  DOWN : 1,
  RIGHT : 2,
  LEFT : 3,
};

/*形状*/
const SHAPE = {
  BOX : "BOX",
  CIRCLE : "CIRCLE",
  LINE : "LINE"
};

/*Key*/
const KEY = {
  LEFT : 37,
  UP : 38,
  RIGHT : 39,
  DOWN : 40,
  Z : 90,
  X : 88,
  V : 86,
  C : 67,
  H : 72,
  J : 74,
  K : 75,
  L : 76,
  SP : 32,
  SHIFT : 16, 
  ESC : 27, 
}

/*State*/ 
const STATE = {
  INIT : "INIT",
  STAGE : "STAGE",
  TITLE : "TITLE",
  PAUSE : "PAUSE"
}

/*Entity*/
const ENTITY = {
  PLAYER  : "PLAYER",
  WALL : "WALL",
  MOVER : "MOVER",
  ENEMY : "ENEMY",
  OTHERS : "OTHERS",
}

/*MapChip*/
const TILE = {
  SPACE : 0,
  WALL :1,
  PLAYER : 2,
  ENEMY : 3,
  GOAL : 4,
  BACK : 5,
  SIGN : 6,
  NEEDLE : 7,
  FORE : 8,
}


/*UI*/
const UI_ = {
  HP : "HP",
  BULLET : "BULLET",
  FONT : "FONT",
  SCORE : "SCORE",
  MSSSAGE : "MES"
}

/*Vector*/
const vec2 = (x,y)=>{
  if(y===undefined) return {x:x,y:x}
  else return {x:x,y:y}
};
const vec3 = (x,y,z)=>{
  if(y===undefined) return {x:x,y:x,z:x}
  else return {x:x,y:y,z:z}
};
const copy= (v)=>{return {
  x:v.x,
  y:v.y,
  z:v.z}
};//値渡し
const add = (v1,v2)=>{
  return {
    x:v1.x + v2.x ,
    y:v1.y + v2.y ,
    z:v1.z + v2.z ,
  }
}
const sub = (v1,v2)=>{ return {
  x:v1.x - v2.x ,
  y:v1.y - v2.y ,
  z:v1.z - v2.z
  }
};
//スカラー倍
const scala = (a, v) => {
  return {
    x: a * v.x,
    y: a * v.y,
    z: a * v.z
  }
};//ベクトル加算
const mul = (v1, v2) => {
  return {
    x: v1.x * v2.x,
    y: v1.y * v2.y,
    z: v1.z * v2.z,
  }
};//ベクトル乗算
const fromPolar =  (arg,vi)=>{return {x:vi*Math.cos(arg),y:vi*Math.sin(arg)}}//極表示のベクトルを直交座標に変換
const normalize = v=>{
  let a = Math.sqrt(v.x * v.x + v.y * v.y + v.z*v.z);
  v.x /= a;
  v.y /= a;
  v.z /= a;
return v;
}
const dot = (v1,v2)=>{
  let d = 
      v1.x*v2.x
    + v1.y*v2.y
    + v1.z*v2.z
  return d 
};//内積
const reflect = (v,n)=>{
  return add(v,scala(-2*dot(v,n),n));
}
/*Random*/
const Rand = (d)=>{
  return 2 * d * (Math.random()-0.5);
}
const Dice = (d)=>{
  return Math.floor(d * (Math.random()));
}
//random between
const RandBET = (min,max)=>{
  return Math.floor((max-min)*Math.random())+min;
}
//random Range
const RandomRange = (min,max)=>{
  return Math.floor((max-min)*Math.random())+min;
}
/*maxmin*/
const BET = (min,x,max)=>{
  return Math.min(Math.max(x,min),max);
}
/*maxmin*/
const clamp = (x,min,max)=>{
  return Math.min(Math.max(x,min),max);
}
const lerp = (x,y,t)=>{
  //if(t<0 || t>1)console.warn(t)
  return x*t + y*(1-t);
}

//-d ~ +d までの値を返す
let Rand2D = (d)=>{
  const angle = Rand(Math.PI);
  let vi = Rand(d/2)+d/2;
  let p = {
    x:Math.cos(angle)*vi,
    y:Math.sin(angle)*vi,
  }
  return p;
}
/*distance*/
let DIST = (p1,p2)=>{
  return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y));
}
/*distance*/
let dist = (p1,p2)=>{
  return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y));
}
//チェビシェフ
let DIST_C = (p1,p2)=>{
  return Math.max(Math.abs(p1.x-p2.x)+Math.abs(p1.y-p2.y));
}
//
let length = (v)=>{
  return Math.sqrt(v.x * v.x + v.y * v.y);
}
/*for debug*/
let cl = console.log;

function SquareArray(size){
 let array =  [
        -size ,+size , 0.0 ,//左上
        +size ,+size , 0.0 ,//右上
        -size ,-size , 0.0 ,//左下
        +size ,-size , 0.0 ,//右下
      ];
  return array
}
function SquareUVArray(){
 let array =  [
        0.0 , 1.0 ,
        1.0 , 1.0 ,
        0.0 , 0.0 ,
        1.0 , 0.0 ,
      ];
  return array
}
const cross = (v1,v2)=>{
  return {
    x : v1.y*v2.z - v1.z*v2.y,
    y : v1.z*v2.x - v1.x*v2.z,
    z : v1.x*v2.y - v1.y*v2.x,
  }
}
/*matrix*/
const GetTransformMatrix = (pos)=>{
  return [
    1,0,0,0,
    0,1,0,0,
    0,0,1,0,
    pos.x,pos.y,pos.z,1
  ];
}
const IdMat = [
  1,0,0,0,
  0,1,0,0,
  0,0,1,0,
  0,0,0,1,
]
const multMatrixVec3 = (m1,v1)=>{
  let v = vec3(0);
  v.x += m1[0]*v1.x + m1[1]*v1.y + m1[2]*v1.z; 
  v.y += m1[3]*v1.x + m1[4]*v1.y + m1[5]*v1.z; 
  v.z += m1[6]*v1.x + m1[7]*v1.y + m1[8]*v1.z; 
  return v;
}
const LockAt = (eye,forward,up)=>{
  const side = normalize(cross(forward,up));
  up = normalize(cross(forward, side));
  forward = normalize(forward);
  const m = [
    side.x, up.x, forward.x, 0,
    side.y, up.y, forward.y, 0,
    side.z, up.z, forward.z, 0,
    -dot(eye, side), -dot(eye, up), -dot(eye, forward), 1
  ];
  return m;
}
const ico = ()=>{
 let index = [
    7,8,0,
    0,8,1,
    8,9,1,
    1,9,2,
    9,5,2,

    2,5,3,
    5,6,3,
    3,6,4,
    6,7,4,
    4,7,0,

    10,4,0,
    10,3,4,
    10,2,3,
    10,1,2,
    10,0,1,

    9,11,5,
    11,9,8,
    11,8,7,
    11,6,5,
    11,7,6,
  ];
  let PI = Math.PI;
  let t  = 2*PI/5;
  let e = 0.8;
  let r = e/Math.sqrt(2*(1-Math.cos(t)));
  let h = Math.sqrt(e*e-r*r);
  let se = e * Math.sqrt(3)/4;
  let vertices = [
    //pentagon1
    r*Math.cos(0*t),  -se, r*Math.sin(0*t),
    r*Math.cos(1*t),  -se, r*Math.sin(1*t),
    r*Math.cos(2*t),  -se, r*Math.sin(2*t),
    r*Math.cos(3*t),  -se, r*Math.sin(3*t),
    r*Math.cos(4*t),  -se, r*Math.sin(4*t),
    //pentagon2
    r*Math.cos(0*t+PI),se, r*Math.sin(0*t+PI),
    r*Math.cos(1*t+PI),se, r*Math.sin(1*t+PI),
    r*Math.cos(2*t+PI),se, r*Math.sin(2*t+PI),
    r*Math.cos(3*t+PI),se, r*Math.sin(3*t+PI),
    r*Math.cos(4*t+PI),se, r*Math.sin(4*t+PI),
 
    0,  -(se+h),0, 
    0,  +(se+h),  0, 
  ];
  return [vertices,index];
}
//球面座標を入れると直交座標を返す
const SphericalCoordToPosition = (r,theta,phi)=>{
  let pos = vec3(
    r * Math.sin(phi)*Math.sin(theta),
    r * Math.cos(phi),
    r * Math.sin(phi)*Math.cos(theta)
  );
  return pos;
};
const easeOut = (x)=>{
  x = Math.min(Math.max(x,0),1);
  let x_inv = 1-x;
  let intence = 6;//収縮のはやさ
  let y = 1-Math.pow(x_inv,intence);
  return y; 
}