attribute vec3 position;
attribute vec2 uv;
uniform float size;
uniform mat4 transformMatrix;
uniform mat4 projMatrix;
uniform mat4 viewMatrix;

void main() {
  gl_Position = 
    projMatrix *
    viewMatrix * 
    transformMatrix * 
    vec4(position * size, 1);
}