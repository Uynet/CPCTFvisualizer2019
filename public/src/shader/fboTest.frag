precision mediump float;
varying vec2 vUV;
uniform sampler2D tex;

void main() {
    if (0.01 < vUV.x && vUV.x < 0.99 && 0.01 < vUV.y && vUV.y < 0.99) {
        vec4 tex = texture2D(tex, vUV);
        gl_FragColor = tex;
    } else {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    }
}