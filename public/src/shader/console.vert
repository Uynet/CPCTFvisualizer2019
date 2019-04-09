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
  vec4 pos = vec4(position,1);
  fPos = gl_Position.xyz;
  fTime = time;
  // mat4 rot = mat4(
  //     cos(a), 0 , -sin(a) , 0. ,
  //     0. , 1. , 0. , 0. ,
  //     sin(a),0 , cos(a) , 0. ,
  //     0. , 0. , 0. , 1. 
  //   );
  gl_Position = 
    projMatrix *
    viewMatrix * 
    transformMatrix * 
    rotMatrix *
    pos;
  depth = gl_Position.z;
}
