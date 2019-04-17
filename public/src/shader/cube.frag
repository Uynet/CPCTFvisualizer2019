precision mediump float;
varying float depth;
varying vec3 pos;
varying vec2 vUV;
varying float size_f;
uniform sampler2D trap;
uniform float accel;

#define PI 3.14159265

vec3 gradient(vec2 uv){
  vec3 f = vec3(uv.x*2.0,1.0-uv.y*4.0,1.0-uv.x*0.9)*0.9;
  return f;
}
void main(){
  vec2 uv = vUV;

  vec3 red= vec3(0.93,0.08,0.31);
  vec3 blue = vec3(0.58,0.08,1.08);
  vec4 tex = texture2D(trap,uv);
  vec3 col = tex.xyz;
  vec3 invert = 1.0-col; 
  col = mix(col,invert,accel/30.0);//accle:0-40
  float alpha = 1.0-depth/90.0;
  if(max(abs(uv.x-0.5),abs(uv.y-0.5))>0.45)col = mix(blue,red,size_f/3.0);
  else discard;//テクスチャ描画切ります
  //if(max(abs(uv.x-0.5),abs(uv.y-0.5))>0.45)gl_FragColor = vec4(invert,1.0);
  gl_FragColor = vec4(col,1.0);
}
