attribute vec3 position;
attribute vec2 uv;
varying vec2 vUV;
uniform float time;
uniform mat4 transformMatrix;
uniform mat4 projMatrix;
uniform mat4 viewMatrix;
uniform float size;
varying float fSize;
varying float depth;
varying vec3 pos;

#define PI 3.1415965


// float atan2(vec2 p){
//     return p.x == 0.0 ? sign(p.y)*PI/2. : atan(p.y, p.x);
// }
// float func(float x){
//   if(abs(sin(x*3.0))<0.90)return 200.0;
//   else return 0.2;

// }

void main(){
  pos = position;
  vUV = uv;
  pos *= size;
  //pos.xz*= size/1.6;

  
  // float f = 20.0;
  // float t = atan2(pos.xz)/2.0;
  // float p = time/100.0+t;
  // float amp = func(p);
  // amp *= exp(amp);
  // amp *= 0.02;

  // pos.y += amp*sin(t*f-time*0.10);
  //   mat4 rot = mat4(
  //     1. , 0. , 0. , 0. ,
  //     0, cos(a) , -sin(a) , 0. ,
  //     0, sin(a) , cos(a) , 0. ,
  //     0. , 0. , 0. , 1. 
  //   );
  float a = PI/4.0;
  float b = time*0.03;
  mat4 rotX = mat4(
      1. , 0. , 0. , 0. ,
      0, cos(a) , -sin(a) , 0. ,
      0, sin(a) , cos(a) , 0. ,
      0. , 0. , 0. , 1. 
  );
  mat4 rotY = mat4(
      cos(b), 0 , -sin(b) , 0. ,
      0. , 1. , 0. , 0. ,
      sin(b),0. , cos(b) , 0. ,
      0. , 0. , 0. , 1. 
  );
  mat4 rotZ = mat4(
      cos(a), -sin(a),0. , 0. ,
      sin(a), cos(a),0. , 0. ,
      0. , 0. , 1. , 0. ,
      0. , 0. , 0. , 1. 
  );
  mat4 rot = rotY * rotX *rotZ;
  gl_Position = 
    projMatrix *
    viewMatrix * 
    transformMatrix * 
    rot*
    vec4(pos,1);
    

  depth = gl_Position.z;
}
