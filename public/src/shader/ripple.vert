attribute vec3 position;
attribute vec2 uv;
varying vec2 vUV;
//uniform float size;
uniform mat4 rotMatrix;
uniform mat4 transformMatrix;
uniform mat4 projMatrix;
uniform mat4 viewMatrix;

mat4 mvpMatrix = projMatrix * viewMatrix * transformMatrix * rotMatrix;

void main() {
  vUV = uv;

  float size = 2.0;
  gl_Position =  mvpMatrix * vec4(position * size, 1);
}