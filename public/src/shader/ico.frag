precision mediump float;
varying float depth;
varying vec3 pos;
varying vec3 posuv;
varying float radius;
varying float fTime;
uniform sampler2D trap;


#define PI 3.14159265

void main(){
  vec3 black = vec3(0);
  vec3 white= vec3(1,0,0);
  vec3 col = black;
  float a = 0.7;
  //float d = mod(abs(length(pos)-radius+a),3.0);
  vec3 p = pos;
  vec2 uv = posuv.xy; 
  float d = length(p)-radius+a;
  if(d<-5.0)discard;
  //if(d>3.9)discard;
  if(sin(pos.x*2.)>0.0)col = white;
  float alpha = 1.0-depth/100.0;
  //alpha = 1.0;
  gl_FragColor = vec4(0.38,0.3,1.0,alpha);

  vec4 tex  = texture2D(trap,uv.xy);
  //if(tex.w<0.01)discard;
 //else gl_FragColor = vec4(1.08,0.3,0.38,alpha);

}
