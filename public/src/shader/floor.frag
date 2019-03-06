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
  uv -= 0.5;
  vec4 texColor = texture2D(trap, clamp(uv*2.+0.5,vec2(0),vec2(1)));
  texColor.xyz = grad*0.9;
  //uv = polar(uv);
  //vec3 white = vec3((depth+1.)/2.);
  vec3 white = vec3(0.9);

  float alpha = 1.0;
  vec3 col;
  vec2 q = vec2(
      mod(uv.x,0.03),
      mod(uv.y,0.03)
  );
  float l = cLength(q-vec2(0.015));//0.0 - 0.1;
  float qx = abs(q.x-0.015);
  float qy = abs(q.y-0.015);
  alpha =1.-depth/45.;
  if(l<0.014)alpha -= (1.0-min(1.0,l*60.));
  col = grad;
  if(texColor.w > 0.01){
    alpha = 1.-depth/45.;
  }
  gl_FragColor = vec4(col,alpha);
}
