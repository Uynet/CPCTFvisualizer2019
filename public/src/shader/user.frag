precision mediump float;
varying vec2 vUV;
varying float depth;
varying float fTime;
uniform sampler2D trap;

#define PI 3.14159265

float cLength(vec2 p){
  if(abs(p.x)>abs(p.y))return abs(p.x);
  return abs(p.y);
}

//position to arg
float atan2(vec2 p){
    return p.x == 0.0 ? sign(p.y)*PI/2. : atan(p.y, p.x);
}
vec2 polar(vec2 p){
  float r = length(p);
  float t = atan2(p);
  return vec2(r,t);
}

void main(){
  vec2 uv = vUV;
  gl_FragColor = vec4(uv,0.1,1.0);
}
