precision mediump float;
varying vec2 vUV;

void main(){
  vec3 black = vec3(247, 9, 112)/256.;
  vec3 white = vec3(1);

  vec2 uv = vUV;
  vec2 po = fract(uv*10.);
  vec3 col;
  if(po.x<0.1)col=black;
  else if(po.y<0.1)col=black;
  else col = white;
  
  gl_FragColor = vec4(col,1.);
}
