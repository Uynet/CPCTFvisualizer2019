precision mediump float;
varying vec2 vUV;
uniform sampler2D trap;
uniform float time;
#define PI 3.14159265;

float getSize(float x){
  //x = clamp(0,1,x);
  float x_inv = 1.0-x;
  float intence = 8.0;//収縮のはやさ
  float y = 1.0-pow(x_inv,intence);
  return y; 
}
float cLength(vec2 p){
  vec2 q = p;
  float a = PI;
  a/=4.0;
  //a *= (1.0-time)*(1.0-time)*4.0;
  q.x = p.x*cos(a) - p.y*sin(a);
  q.y = p.x*sin(a) + p.y*cos(a);
  return max(abs(q.x),abs(q.y));
}
void main() {
  vec2 uv = vUV;
  uv-=0.5;
  float dist = cLength(uv);
  float size = getSize(time);
  float width = 0.06 *(1.0-time*time);
  if(abs(dist-size*0.3)>width)discard;
  float r = 0.1*time*1.0;
  float g = 0.3 + time*0.6;
  float b = 0.9 - time*0.2;
  vec3 col = vec3(r,g,b);
  gl_FragColor=vec4(col,1.);
}