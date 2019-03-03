attribute vec3 position;
attribute vec2 uv;
varying vec2 vUV;

uniform float time;

void main(){
  vUV = uv;
  float a = time*0.004;
  mat4 rot = mat4(
      cos(a),-sin(a),0,0,
      sin(a),cos(a),0,0,
      0,0,1,0,
      0,0,0,1
  );
  vec4 pos = vec4(position,1);
  gl_Position = rot*pos;
}
