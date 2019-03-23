attribute vec3 position;
//attribute vec2 uv;
//varying vec2 vUV;
uniform float time;
uniform mat4 transformMatrix;
uniform mat4 projMatrix;
uniform mat4 viewMatrix;
varying float depth;
varying vec3 pos;
varying vec3 posuv;
varying float radius;
varying float fTime;

#define PI 3.1415965


float atan2(vec2 p){
    return p.x == 0.0 ? sign(p.y)*PI/2. : atan(p.y, p.x);
}
float func(float x){
  if(abs(sin(x*3.0))<0.10)return 200.0;
  else return 0.2;

}

void main(){
  pos = position;
  posuv = pos;
  pos *= 36.0;
  radius = length(pos);
  fTime = time;
  gl_Position = 
    projMatrix *
    viewMatrix * 
    transformMatrix * 
    vec4(pos,1);
  depth = gl_Position.z;
}
