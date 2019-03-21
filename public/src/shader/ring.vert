attribute vec3 position;
//attribute vec2 uv;
//varying vec2 vUV;
uniform float time;
uniform mat4 transformMatrix;
uniform mat4 projMatrix;
uniform mat4 viewMatrix;
varying float depth;
varying vec3 pos;

#define PI 3.1415965


void main(){
  pos = position;
  gl_Position = 
    projMatrix *
    viewMatrix * 
    transformMatrix * 
    vec4(position,1);
  depth = gl_Position.z;
}
