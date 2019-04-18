attribute vec3 position;
attribute vec2 uv;
varying vec2 vUV;
varying float depth;
varying vec3 fPos;
varying float fTime;

uniform float time;
uniform float collumn;

#define PI 3.1415965


void main(){
  vUV = uv;
  //float a = time*0.004;
  //なんか反転しててやばい
  vec4 pos = vec4(-position,1);
  pos.x *=-1.0;
  pos.y -=0.8;
  pos.y -= collumn * 0.1;
  pos *= 0.01;
  fPos = gl_Position.xyz;
  fTime = time;
  gl_Position = 
    pos;
  depth = gl_Position.z;
}
