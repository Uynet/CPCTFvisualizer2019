attribute vec3 position;
attribute vec2 uv;
varying vec2 vUV;
varying float depth;
varying vec3 fPos;
varying float fTime;

uniform float time;
uniform mat4 transformMatrix;
uniform mat4 projMatrix;
uniform mat4 viewMatrix;
uniform mat4 rotMatrix;

#define PI 3.1415965


void main(){
  vUV = uv;
  //float a = time*0.004;
  //なんか反転しててやばい
  vec4 pos = vec4(-position,1);
  pos.x *=-1.0;
  pos.y -=0.8;
  pos *= 0.01;
  fPos = gl_Position.xyz;
  fTime = time;
  gl_Position = 
    //projMatrix *
    //viewMatrix * 
    //transformMatrix * 
    //rotMatrix *
    pos;
  depth = gl_Position.z;
}
