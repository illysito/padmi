precision highp float;

uniform float u_time;
uniform vec2 u_aspect;

varying vec2 vUv;
varying vec3 vColor;

void main() {

  // COORDINATES

  vec2 uv = vUv;

  vec4 color1 = vec4(1.0, 0.0, 0.0, 1.0);
  vec4 color2 = vec4(0.0, 0.0, 1.0, 1.0);
  vec4 color3 = vec4(0.0, 1.0, 0.0, 1.0);
  vec4 color4 = vec4(1.0, 0.0, 1.0, 1.0);

  vec4 grad1 = mix(color1, color2, uv.x);
  vec4 grad2 = mix(color3, color4, uv.x);
  vec4 color = mix(grad1, grad2, uv.y);

  // OUTPUT

  //  gl_FragColor = color;
   gl_FragColor = vec4(vColor, 1.0);
}