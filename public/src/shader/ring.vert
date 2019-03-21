attribute vec3 position;
//attribute vec2 uv;
//varying vec2 vUV;
uniform float time;
uniform mat4 transformMatrix;
uniform mat4 projMatrix;
uniform mat4 viewMatrix;
varying float depth;
varying vec3 pos;

#define PI 3.1415965


float atan2(vec2 p){
    return p.x == 0.0 ? sign(p.y)*PI/2. : atan(p.y, p.x);
}
float func(float x){
  if(abs(sin(x*3.0))<0.10)return 200.0;
  else return 0.2;

}

void main(){
  pos = position;

  float a = time * 0.00;// * pos.z * 0.1 * pos.y;
  float f = 20.0;
  float t = atan2(pos.xz)/2.0;
  float p = time/1200.0+t;
  float amp = func(p);
  amp *= exp(amp);
  amp *= 0.02;

  pos.y += amp*sin(t*f-time*0.10);
    mat4 rot = mat4(
      1. , 0. , 0. , 0. ,
      0, cos(a) , -sin(a) , 0. ,
      0, sin(a) , cos(a) , 0. ,
      0. , 0. , 0. , 1. 
    );
  gl_Position = 
    projMatrix *
    viewMatrix * 
    transformMatrix * 
    rot*
    vec4(pos,1);
    

  depth = gl_Position.z;
}
