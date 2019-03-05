precision mediump float;
varying vec2 vUV;
varying float depth;

void main(){
  vec3 black = vec3(vUV,1.);
  //vec3 white = vec3((depth+1.)/2.);
  vec3 white = vec3(0.9);

  vec2 uv = vUV;
  vec2 po = fract(uv*12.+0.5);
  vec3 col;
  if(po.x<0.1)col=black;
  else if(po.y<0.1)col=black;
  else col = white;
  gl_FragColor = vec4(col,1.);
}
