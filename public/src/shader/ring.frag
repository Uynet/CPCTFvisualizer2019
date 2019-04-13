precision mediump float;
varying float depth;
varying vec3 pos;
varying float t;

#define PI 3.14159265
float PI2  = PI*2.0;

//vec3 gradient(vec2 uv){
vec3 gradient(float x){
  //[[0.731 1.098 0.192] [0.358 0.968 0.657] [1.077 0.360 0.328] [0.965 2.265 0.837]]
  vec3 f= vec3(
      0.731 + 0.358*(cos(x*1.077+0.960*PI2)),
      1.098 + 1.000*(cos(x*0.368+2.265*PI2)),
      -0.292 + 0.658*(cos(x*0.328+0.837*PI2))
  );
  return f;
}
void main(){
  vec3 black = vec3(0);
  vec3 white= vec3(1,0,0);
  vec3 col = vec3(1.00,0.20,0.38);
  //if(sin(pos.x*2.)>0.0)col = white;
  //gl_FragColor = vec4(0.38,0.3,1.0,1.0-depth/90.0);
  //gl_FragColor = vec4(1.00,0.58,0.20,1.0-depth/90.0);
  //col = gradient(t);
  gl_FragColor = vec4(col,1.0-depth/90.0);

}
