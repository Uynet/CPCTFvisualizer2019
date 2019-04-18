precision mediump float;
varying vec2 vUV;
varying float depth; varying vec3 fPos;
varying float fTime;
uniform sampler2D textTexture;

#define PI 3.14159265

void main(){
  vec2 uv = vUV;
  float r =  1.0-uv.x*4.0;
  float g =  1.0-(1.0-uv.y)*0.3;
  float b =  (1.0-uv.y)*2.0;
  vec3 grad = vec3(r,g,b);
  grad *= 0.8;
  uv -= 0.5;

  vec4 texColor = texture2D(textTexture, clamp(uv*1.2+0.5,vec2(0),vec2(1)));
  if(texColor.w < 0.03)discard;
  vec3 col = grad;
  float alpha = 1.0-depth/50.0;
  gl_FragColor = vec4(col,alpha);
}
