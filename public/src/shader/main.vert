attribute vec3 position;
attribute vec2 uv;
varying vec2 vUV;

uniform float time;
uniform mat4 transformMatrix;

void main(){
  vUV = uv;
  float a = time*0.004;
  vec4 pos = vec4(position,1);
  gl_Position = transformMatrix*pos;
}
