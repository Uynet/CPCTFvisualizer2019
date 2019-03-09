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
  vec2 uv = gl_PointCoord;
  //float alpha = 1.-depth/45.;
  float alpha = 1.0;
  vec4 tex = texture2D(trap,uv);
  //if(tex.w < 0.01)discard;
  if(length(uv-0.5)>0.4)discard;
  uv *= 1.5;
  vec3 col = vec3(0.2,0.0,1.0);
  alpha = 1.0 - depth/100.0;
  if(depth > 20.0){
    col = vec3(1,0,0);
  }
  gl_FragColor = vec4(col,alpha);
}
