precision mediump float;
varying float depth;
varying vec3 pos;
varying vec2 vUV;
varying float fSize;
uniform sampler2D trap;

#define PI 3.14159265

void main(){
  vec2 uv = vUV;
  //uv /= fSize;

  //uv /= 2.0;
  vec3 black = vec3(0);
  vec3 white= vec3(1,0,0);
  vec3 col = black;
  vec4 tex = texture2D(trap,uv);
  float alpha = 1.0-depth/90.0;
  if(tex.w<0.01)gl_FragColor = vec4(0.58,0.08,1.08,alpha);
  else gl_FragColor = vec4(1);
}
