precision mediump float;
varying float depth;
varying vec3 pos;
varying float radius;
varying float fTime;

#define PI 3.14159265

void main(){
  vec3 black = vec3(0);
  vec3 white= vec3(1,0,0);
  vec3 col = black;
  float a = 0.7;
  //float d = mod(abs(length(pos)-radius+a),3.0);
  vec3 p = pos;
  float d = length(p)-radius+a;
  //if(d<0.1)discard;
  //if(d>0.3)discard;
  if(sin(pos.x*2.)>0.0)col = white;
  float alpha = 1.0-depth/100.0;
  //alpha = 1.0;
  gl_FragColor = vec4(0.20,0.58,1.20,alpha);
  gl_FragColor = vec4(1.08,0.3,0.38,alpha);
  gl_FragColor = vec4(0.38,0.3,1.0,alpha);

}
