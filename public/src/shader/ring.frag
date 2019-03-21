precision mediump float;
varying float depth;
varying vec3 pos;

#define PI 3.14159265

void main(){
  vec3 black = vec3(0);
  vec3 white= vec3(1,0,0);
  vec3 col = black;
  if(sin(pos.x*2.)>0.0)col = white;
  gl_FragColor = vec4(0.9,0.0,0.3,1);
}
