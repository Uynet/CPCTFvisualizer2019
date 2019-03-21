precision mediump float;
varying vec2 vUV;
varying float depth; varying vec3 fPos;
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

vec2 rot2(vec2 p,float a){
  vec2 q = p;
  q.x = p.x*cos(a)-p.y*sin(a);
  q.y = p.x*sin(a)+p.y*cos(a);
  return q;
}
void grid(){

}

void main(){
  vec2 uv = vUV;
  vec3 grad = vec3((1.0-uv.y)*2.,1.0-uv.x*4.,1.0-(1.0-uv.y)*0.9);
  grad *= 0.9;
  uv -= 0.5;
  vec4 texColor = texture2D(trap, clamp(uv*1.2+0.5,vec2(0),vec2(1)));
  if(texColor.w < 0.01)discard;
  texColor.xyz = grad*1.0;
  vec3 col = grad;
  float alpha = 1.0;
  gl_FragColor = vec4(col,alpha);
}
