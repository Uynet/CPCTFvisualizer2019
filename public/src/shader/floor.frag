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
  vec3 grad = vec3(uv.x*2.,1.0-uv.y*4.,1.0-uv.x*0.9);
  vec3 black= vec3(0);
  uv -= 0.5;
  uv = rot2(uv,fPos.y+2.);
  vec4 texColor = texture2D(trap, clamp(uv*1.2+0.5,vec2(0),vec2(1)));
  /*debug
  gl_FragColor = texColor;
  return;
  */

  //vec4 texColor = texture2D(trap, clamp(uv*(depth/4.)+0.5,vec2(0),vec2(1)));
  //vec4 texColor = texture2D(trap, clamp(uv*(tan(depth*0.1))+0.5,vec2(0),vec2(1)));
  texColor.xyz = grad*0.9;
  //uv = polar(uv);
  //vec3 white = vec3((depth+1.)/2.);
  vec3 white = vec3(0.9);

  float alpha = 1.0;
  vec3 col;

  vec2 phase = vec2(
      fTime*0.0000,
      fTime*0.0000
  );
  vec2 q = vec2(
      mod(uv.x+phase.x,0.03),
      mod(uv.y+phase.y,0.03)
  );
  float d = length(uv);
  d*=d;
  float l = cLength(q-vec2(0.015));//0.0 - 0.1;
  float qx = abs(q.x-0.015);
  float qy = abs(q.y-0.015);
  alpha =1.-depth/100.-d;
  if(l<0.0145)alpha -= (1.0-min(1.0,l*(20.0+depth*4.0)))+d;
  col = grad*0.9;

  alpha = 0.0;
  if(texColor.w > 0.01){
    alpha = 1.-depth/100.-d;
    //col = vec3(0.2,0.0,1.0);
  }
  if(alpha <0.3)discard;
  gl_FragColor = vec4(col,alpha);
}
