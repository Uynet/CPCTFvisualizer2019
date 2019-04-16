precision mediump float;
varying vec2 vUV;
varying float depth; varying vec3 fPos;
varying float fTime;
uniform sampler2D trap;

#define PI 3.14159265
float PI2  = PI*2.0;

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
  t+=PI;
  return vec2(r,t);
}

vec2 rot2(vec2 p,float a){
  vec2 q = p;
  q.x = p.x*cos(a)-p.y*sin(a);
  q.y = p.x*sin(a)+p.y*cos(a);
  return q;
}
vec3 gradient(vec2 uv){
  //[[0.731 1.098 0.192] [0.358 0.968 0.657] [1.077 0.360 0.328] [0.965 2.265 0.837]]
  /*
  vec3 f= vec3(
      0.731 + 0.358*(cos(x*1.077+0.960*PI2+fTime/77.0)),
      1.098 + 1.000*(cos(x*0.368+2.265*PI2)),
      -0.292 + 0.658*(cos(x*0.328+0.837*PI2))
  );
  */
  vec3 f = vec3(uv.x*2.0,1.0-uv.y*4.0,1.0-uv.x*0.9)*0.9;
  return f;
}

void main(){
  vec2 uv=vUV;
  //vec3 black=vec3(0);
  uv-=.5;
  vec4 texColor = texture2D(trap,clamp(uv*1.2+.5,vec2(0),vec2(1)));
  if(texColor.w < 0.01)discard;
  uv = rot2(uv,-2.5);
  vec2 puv = polar(uv);
  vec3 grad = gradient(uv+0.5);
  grad.y = 0.03 * pow(
      (cos(puv.y-PI)+1.0),4.0
      );
  float po=depth/100.;
  grad = mix(grad,vec3(1),po);
  //vec3 gray = vec3((grad.x + grad.y + grad.z)/3.0);
  //grad = mix(gray,grad,(pow(sin(fTime*0.03),8.0)));
  gl_FragColor = vec4(grad,1.0);
  return;
  /*
  texColor.xyz = grad*0.9;
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
  //alpha =1.-depth/100.-d;
  if(l<0.0145)alpha -= (1.0-min(1.0,l*(20.0+depth*4.0)))+d;
  col = grad;

  alpha = 0.0;
  if(texColor.w > 0.01){
    //alpha = 1.-depth/100.-d;
    alpha = 1.0;
    //col = vec3(0.2,0.0,1.0);
  }
  gl_FragColor = vec4(col,alpha);
  */
}
