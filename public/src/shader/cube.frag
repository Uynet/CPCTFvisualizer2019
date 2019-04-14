precision mediump float;
varying float depth;
varying vec3 pos;
varying vec2 vUV;
varying float fSize;
uniform sampler2D trap;
uniform float accel;

#define PI 3.14159265

void main(){
  vec2 uv = vUV;
  //uv /= fSize;
  //uv /= 2.0;
  vec3 white= vec3(1,0,0);
  vec4 tex = texture2D(trap,uv);
  vec3 col = tex.xyz;
  vec3 invert = 1.0-col; 
  col = mix(col,invert,accel/30.0);//accle:0-40
  float alpha = 1.0-depth/90.0;
  //if(max(abs(uv.x-0.5),abs(uv.y-0.5))>0.45)gl_FragColor = vec4(0.58,0.08,1.08,alpha);
  if(max(abs(uv.x-0.5),abs(uv.y-0.5))>0.45)gl_FragColor = vec4(invert,1.0);
  else gl_FragColor = vec4(col,1.0);
}
