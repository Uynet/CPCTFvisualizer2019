attribute vec3 position;
attribute vec2 uv;
varying vec2 vUV;
uniform float time;
uniform mat4 transformMatrix;
uniform mat4 projMatrix;
uniform mat4 viewMatrix;
uniform float size;
//varying float size_f;

#define PI 3.1415965


// float atan2(vec2 p){
//     return p.x == 0.0 ? sign(p.y)*PI/2. : atan(p.y, p.x);
// }
// float func(float x){
//   if(abs(sin(x*3.0))<0.90)return 200.0;
//   else return 0.2;

// }

void main(){
  vec3 pos = position;
  vUV = uv;
  pos *= size;
  //size_f = size;
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
  float x = cos(a);
  float y = sin(a);
  float u = cos(b);
  float v = sin(b);
  mat4 rotY = mat4(
      u, 0 , -v , 0. ,
      0. , 1. , 0. , 0. ,
      v,0. , u , 0. ,
      0. , 0. , 0. , 1. 
  );
  /*
  mat4 rotX = mat4(
      1. , 0. , 0. , 0. ,
      0, x , -y , 0. ,
      0, y , x , 0. ,
      0. , 0. , 0. , 1. 
  );
  mat4 rotZ = mat4(
      x, -y,0. , 0. ,
      y, x,0. , 0. ,
      0. , 0. , 1. , 0. ,
      0. , 0. , 0. , 1. 
  );
  */
  ///mat4 rot = rotY * rotX *rotZ;
  mat4 rot = rotY * mat4(
     x  , -y , 0. , 0.,
     x*y, x*x, -y , 0.,
     y*y, x*y, x,  0.,
     0. ,0.  , 0. , 1.
  );
  /*
  mat4 rot = mat4(
     u*x -v*y*y , -u*y-v*x*y , -v*x , 0., x * y      ,  x*x       , -y   , 0.,
     u*y*y + v*x,u*x*y-v*y   ,u*x   , 0.,
     0.         ,  0.        ,  0.  , 1.
  );
  */
  gl_Position = 
    projMatrix *
    viewMatrix * 
    transformMatrix * 
    rot*
    vec4(pos,1);
  //size_f = size/gl_Position.z;
}
