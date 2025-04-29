import { DoubleSide, ShaderMaterial, PlaneGeometry, Mesh } from 'three'

function createTransmissionPlane() {
  //prettier-ignore
  const planeH = 3 * 10
  const planeW = 3 * 10

  const uniforms = {
    u_time: { value: 1600.0 + 100.0 * Math.random() },
    u_mouseX: { value: 0.0 },
    u_mouseY: { value: 0.0 },
  }

  const fragmentShader = `
  precision highp float;

#define NUM_OCTAVES 5

uniform float u_time;

varying vec2 vUv;
varying vec4 vColor;

float rand(vec2 n) { 
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

void main() {

  // COORDINATES

  vec2 uv = vUv;
  vec4 color = rand(vUv) * vec4(0.1,0.1,0.1,0.1);
  gl_FragColor = color;
}
  `

  const vertexShader = `varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`

  const material = new ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    wireframe: false,
    side: DoubleSide,
  })

  //prettier-ignore
  const geometry = new PlaneGeometry(planeW, planeH, 50, 50) /* UPDATE LATER */
  const mesh = new Mesh(geometry, material)

  mesh.position.z = -4

  mesh.tick = (delta) => {
    uniforms.u_time.value = (uniforms.u_time.value + 0.05 * delta) % 10000
    // console.log('ticking' + uniforms.u_time)
  }

  return mesh
}

export { createTransmissionPlane }
