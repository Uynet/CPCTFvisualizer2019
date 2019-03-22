precision mediump float;
varying float depth;
varying vec3 pos;
varying vec2 vUV;
uniform sampler2D trap;

#define PI 3.14159265

void main(){
  vec2 uv = vUV;
  vec3 black = vec3(0);
  vec3 white= vec3(1,0,0);
  vec3 col = black;
  if(sin(pos.x*2.)>0.0)col = white;
  vec4 tex = texture2D(trap,uv);
  if(tex.w<0.01)gl_FragColor = vec4(1.00,0.58,0.20,1.0-depth/90.0);
  else gl_FragColor = gl_FragColor = vec4(0.38,0.3,1.0,1.0-depth/90.0);
}
