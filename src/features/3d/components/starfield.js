//prettier-ignore
import {
  BufferAttribute,
  ShaderMaterial,
  BufferGeometry,
  // CanvasTexture,
  Points,
  Clock,
} from 'three'

// function createCircularTexture() {
//   const size = 64 // Texture resolution
//   const canvas = document.createElement('canvas')
//   canvas.width = size
//   canvas.height = size
//   const ctx = canvas.getContext('2d')

//   // Draw a circular gradient
//   ctx.beginPath()
//   ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
//   ctx.fillStyle = 'white'
//   ctx.fill()

//   return new CanvasTexture(canvas)
// }

const starfieldFragment = `
precision mediump float;

void main() {
  // Soft edges for circular particles
  float alpha = smoothstep(0.5, 0.1, length(gl_PointCoord - vec2(0.5)));

  vec2 coord = gl_PointCoord - 0.5;
  float dist = length(coord);
  if (dist > 0.5) discard; // Discard pixels outside the circle

  // Output final color (white particles)
  gl_FragColor = vec4(vec3(1.0), alpha);
}
`

const starfieldVertex = `
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_strength;

varying vec3 vColor;

void main() {
  vec3 newPosition = position;

  // Convert mouse to normalized space (-1 to 1)
  vec2 mousePos = (u_mouse - 0.5) * 2.0;

  // Natural movement
  vec3 move = vec3(
    0.018 * sin(u_time) * position.x * position.y,
    0.012 * cos(u_time) * position.y * position.z,
    0.024 * sin(u_time) * position.z * position.x
  );

  // Distance from mouse (XY plane)
  float dist = distance(mousePos, position.xy);

  // Warp effect (stronger near the mouse)
  float strength = smoothstep(0.4, 6.0, dist);
  strength = smoothstep(0.2, 2.0, strength); ////// ESTA ES LA LINEA CREMA!!
  newPosition += strength;
  newPosition += move;

  // Final position
  // gl_PointSize = 50.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  gl_PointSize = 5.0;
}
`

function createStarfield() {
  const particlesCnt = 2500
  const posArray = new Float32Array(particlesCnt * 3)
  const container = document.querySelector('.particles-container')

  for (let i = 0; i < particlesCnt; i++) {
    // Random spherical distribution
    const r = Math.cbrt(Math.random()) * 5 // Spread within a sphere of radius 5
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(Math.random() * 2 - 1)

    posArray[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    posArray[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    posArray[i * 3 + 2] = r * Math.cos(phi)
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(posArray, 3))

  const uniforms = {
    u_time: { value: 0 },
    u_mouse: { value: { x: 0.5, y: 0.5 } },
    u_strength: { value: 10.3 },
  }

  const material = new ShaderMaterial({
    uniforms,
    vertexShader: starfieldVertex,
    fragmentShader: starfieldFragment,
    transparent: true,
  })
  // const particlesCnt = 5000
  // const posArray = new Float32Array(particlesCnt * 3)
  // for (let i = 0; i < particlesCnt * 3; i++) {
  //   posArray[i] = (Math.random() - 0.5) * 1
  //   console.log('dot created')
  // }
  // geometry.setAttribute('position', new BufferAttribute(posArray, 3))
  const mesh = new Points(geometry, material)
  mesh.position.z = -12

  const clock = new Clock()

  mesh.tick = () => {
    uniforms.u_time.value = clock.getElapsedTime()
  }

  container.addEventListener('mousemove', (event) => {
    //prettier-ignore
    uniforms.u_mouse.value.x = 0 * event.clientX / container.clientWidth
    uniforms.u_mouse.value.y = 0 * (1 - event.clientY / container.clientHeight) // Flip Y axis
  })
  // console.log('hey!')
  return mesh
}

export { createStarfield }
