const warp_type_frag = `
precision highp float;

#define NUM_OCTAVES 5

uniform sampler2D u_texture;
uniform float u_mouseX;
uniform float u_mouseY;
uniform float u_time;
uniform vec2 u_aspect;

varying vec2 vUv;

uniform vec2 u_prevMouse;

float rand(vec2 n) {
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
	vec2 ip = floor(p);
	vec2 u = fract(p);
	u = u*u*(3.0-2.0*u);

	float res = mix(
		mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
		mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
	return res*res;
}

float fbm(vec2 x) {
	float v = 0.0;
	float a = 0.5;
	vec2 shift = vec2(100);
	// Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
	for (int i = 0; i < NUM_OCTAVES; ++i) {
		v += a * noise(x);
		x = rot * x * 2.0 + shift;
		a *= 0.5;
	}
	return v;
}

void main() {

  // COORDINATES

  vec2 coords = vUv;
  vec2 normalized_coords = coords;
  float asp = u_aspect.x / u_aspect.y;
  normalized_coords.x *= asp;

  // MOUSE

  vec2 u_mouse = vec2(u_mouseX, u_mouseY);
  u_mouse.y = 1.0 - u_mouse.y;
  u_mouse.x *= asp;
  vec2 prevMouse = u_prevMouse;
  prevMouse.y = 1.0 - u_prevMouse.y;
  prevMouse.x *= asp;

  // POINT

  vec2 point = vec2(0.85, 0.5);

  // DISTANCE

  float dist = distance(prevMouse, normalized_coords);
  float static_dist = distance(point, normalized_coords);

  // DISTORTION

  float fbm = fbm(u_mouse);

  float radius = 0.15 * (0.1 * sin(0.3 * u_time) + 0.015 * abs(sin(0.2 * u_time)));
  radius = 0.035;
  float strength = 0.0;

  float static_radius = 0.4 * (0.16 * sin(0.1 * u_time) + 0.25 * abs(sin(0.1 * u_time)));
  float static_strength = 0.0;

  // float strength = mix(1.0, 0.0, smoothstep(radius, radius * 1.2, dist));
  // float strength = mix(0.0, 0.1, dist);

  // CONFINADO EN UN CIRCULO : UTIL PARA EFECTO DE ONDAS ESTANQUE

  // if (dist < radius) {
  //   strength = smoothstep(0.0, radius, dist);
  //   strength = smoothstep(0.2, 5.8, strength);
  // }

  // FLOW NORMAL

  strength = smoothstep(0.4, radius, dist);
  strength = smoothstep(0.2, 8.0, strength);

  static_strength = smoothstep(0.3, static_radius, static_dist);
  static_strength = smoothstep(0.2, 5.8, static_strength);

  // DIVIDING IN BLOCKS

  float blocks = 0.1;
  float x = coords.x;
  float y = coords.y;
  x = floor(coords.x * asp * blocks) / (asp * blocks);
  y = floor(coords.y * blocks) / blocks + 0.15 * sin(u_time);

  vec2 distortion = vec2(
    sin(0.5 * prevMouse.x - 2.1 * x + 2.2 * y),
    cos(0.5 * prevMouse.y + 2.1 * x - 2.8 * y)
  );

  vec2 static_distortion = vec2(
    sin(0.5 * point.x - 2.1 * x + 2.2 * y),
    cos(0.5 * point.y + 2.1 * x - 2.8 * y)
  );

  distortion *= 0.89 * strength;
  distortion = smoothstep(0.0, 0.2, clamp(distortion, 0.0, 1.0));
  distortion *= 2.0 * fbm;

  static_distortion *= 0.8 * static_strength;
  static_distortion = smoothstep(0.0, 0.2, clamp(static_distortion, 0.0, 1.0));
  static_distortion *= 2.0 * fbm;

  vec2 center = vec2(0.5, 0.5);
  coords -= center;
  coords *= 1.0 + (0.005 * u_mouse.x * u_mouse.y);
  coords += center;

  // ABERRATION

  float separation_factor = mix(0.0, 0.025, strength);

  vec4 redChannel = texture2D(u_texture, coords - distortion + vec2(separation_factor, separation_factor));
  redChannel.g = 0.0;
  redChannel.b = 0.0;

  vec4 greenChannel = texture2D(u_texture, coords - distortion - 0.5 * vec2(separation_factor, separation_factor));
  greenChannel.r = 0.0;
  greenChannel.b = 0.0;

  vec4 blueChannel = texture2D(u_texture, coords - distortion + 2.0 * vec2(separation_factor, separation_factor));
  blueChannel.r = 0.0;
  blueChannel.g = 0.0;

  // OUTPUT

  // coords -= static_distortion;
  // vec4 color = texture2D(u_texture, coords - distortion);
  vec4 color = redChannel + greenChannel + blueChannel;
  gl_FragColor = color;
}
`

// const warp_type_frag = `
// #ifdef GL_ES
// precision highp float;
// #endif

// uniform float u_time;
// uniform sampler2D u_texture;

// varying vec2 v_texcoord;

// void main() {
//   vec4 color = texture2D(u_texture, vUv);
//   gl_FragColor = color;
// }
// `

const warp_type_vertex = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export { warp_type_frag, warp_type_vertex }
