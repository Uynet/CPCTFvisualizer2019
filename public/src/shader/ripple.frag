precision mediump float;
varying vec2 vUV;
uniform sampler2D trap;
uniform float size;
uniform float time;

void main() {
  vec2 uv = vUV;
  uv-=0.5;
  //vec4 texColor = texture2D(trap, uv);
  //if (texColor.w > 0.03) {
  float dist = length(uv);
  float r = 0.1*time*1.0;
  float g = 0.3 + time*0.6;
  float b = 0.9 - time*0.2;
  vec3 col = vec3(r,g,b);
  //float alpha = 1.0-time;
  //col = mix(vec3(1),col,alpha);
  float width = 0.08 *(1.0-time*time);
  if(abs(dist-size*0.4)<width)gl_FragColor = vec4(col,1.0);
  else discard;
}