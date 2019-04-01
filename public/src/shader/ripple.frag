precision mediump float;
varying vec2 vUV;
uniform sampler2D trap;

void main() {
  vec2 uv = vUV;
  vec4 texColor = texture2D(trap, uv);
  if (texColor.w > 0.03) {
    gl_FragColor = vec4(0.1, 0.1, 0.2, 1.0);
  } else {
    discard;
  }
}