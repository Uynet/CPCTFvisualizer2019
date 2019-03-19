attribute vec3 position;
//attribute vec2 uv;
//varying vec2 vUV;
uniform float time;
uniform mat4 transformMatrix;
uniform mat4 projMatrix;
uniform mat4 viewMatrix;

#define PI 3.1415965


void main(){
  vec4 pos = vec4(position,1);
  time;
  gl_Position = 
    projMatrix *
    viewMatrix * 
    transformMatrix * 
    pos;
}
