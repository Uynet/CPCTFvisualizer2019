attribute vec3 position;
attribute vec2 uv;
varying vec2 vUV;
varying float depth;
varying float fTime;

uniform float time;
uniform mat4 transformMatrix;
uniform mat4 projMatrix;
uniform mat4 viewMatrix;

#define PI 3.1415965


void main(){
  vUV = uv;
  float a = PI/2.;
  vec4 pos = vec4(position,1);

  float b = time*0.01;
  fTime = time;
  mat4 rot = mat4(
      1. , 0. , 0. , 0. ,
      0, cos(a) , -sin(a) , 0. ,
      0, sin(a) , cos(a) , 0. ,
      0. , 0. , 0. , 1. 
  );
  gl_Position = 
    projMatrix *
    viewMatrix * 
    transformMatrix * 
    rot * 
    pos;
  depth = gl_Position.z;
}
