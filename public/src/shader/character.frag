precision mediump float;
varying vec2 vUV;
varying float depth;
varying float fTime;
uniform sampler2D char;

/*
#define PI 3.14159265

float cLength(vec2 p){
  if(abs(p.x)>abs(p.y))return abs(p.x);
  return abs(p.y);
}

//position to arg
float atan2(vec2 p){
    return p.x == 0.0 ? sign(p.y)*PI/2. : atan(p.y, p.x);
}
vec2 polar(vec2 p){
  float r = length(p);
  float t = atan2(p);
  return vec2(r,t);
}

void main(){
  vec2 uv = gl_PointCoord;
  //float alpha = 1.-depth/45.;
  float alpha = 1.0;
  vec4 tex = texture2D(char,uv);
  //if(tex.w < 0.01)discard;
  if(length(uv-0.5)>0.4)discard;
  uv *= 1.5;
  vec3 col = vec3(0.2,0.0,1.0);
  alpha = 1.0 - depth/100.0;
  if(depth > 20.0){
    col = vec3(1,0,0);
  }
  gl_FragColor = vec4(col,alpha);
}
*/


float median(vec3 p) {
  float r = p.r;
  float g = p.g;
  float b = p.b;
  return max(min(r, g), min(max(r, g), b));
}

void debug(){
}
void main() {
    //vec2 msdfUnit = gl_PointSize/vec2(textureSize(msdf, 0));
    vec2 msdfUnit = vec2(16.0);
    vec2 uv = gl_PointCoord;
    float texsize = 16.0;

    /*debug*/
    //gl_FragColor = texture2D(char, uv);
    //return;
    /*debug*/

    vec3 sample = texture2D(char, uv).rgb;
    vec3 sample_nx = texture2D(char, uv+vec2(1,0)/texsize).rgb;
    vec3 sample_ny = texture2D(char, uv+vec2(0,1)/texsize).rgb;

    float sigDist = median(sample.rgb) - 0.5;
    float sigDist_nx = median(sample_nx.rgb) - 0.5;
    float sigDist_ny = median(sample_ny.rgb) - 0.5;

    float dx = sigDist_nx - sigDist;
    float dy = sigDist_ny - sigDist;

    float fw = abs(dx)+abs(dy); 

    sigDist *= dot(msdfUnit, vec2(0.5/fw));
    float opacity = clamp(sigDist + 0.5, 0.0, 1.0);
    vec3 black = vec3(0.99,0.02,0.30);
    vec3 white = vec3(1);
    vec3 col = mix(white, black, opacity);
    if(opacity<0.05)discard;
    gl_FragColor = vec4(col,opacity);
}
