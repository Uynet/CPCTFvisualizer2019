precision mediump float;
varying vec2 vUV;
varying float depth;
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
  vec3 grad = vec3(uv.x*2.,1.0-uv.y*4.,1.0-uv.x*0.9);
  vec3 black= vec3(0);
  vec4 texColor = texture2D(trap, uv);
  uv -= 0.5;
  texColor.xyz = grad*0.9;
  uv = polar(uv);
  //vec3 white = vec3((depth+1.)/2.);
  vec3 white = vec3(0.9);

  float alpha = 1.0;
  vec3 col;
  vec2 q = vec2(
      mod(uv.x,0.1),
      mod(uv.y,0.5)
  );
  //float l = cLength(q);//0.0 - 0.1;
  alpha = 0.0;
  if(q.x>0.08)alpha = 1.-depth/45.;
  if(q.y<0.04)alpha = 1.-depth/45.;
  col = grad;
  gl_FragColor = vec4(col,alpha);
  if(texColor.w > 00.1)texColor.w = 1.-depth/45.;
  gl_FragColor = texColor;
}
