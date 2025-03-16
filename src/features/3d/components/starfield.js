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

varying vec3 vPosition;

void main() {
  // Soft edges for circular particles
  float alpha = smoothstep(0.5, 0.1, length(gl_PointCoord - vec2(0.5)));
  float alphaFactor = mix(0.3, 0.8, clamp((vPosition.z + 1.0) * 0.5, 0.0, 1.0));

  vec2 coord = gl_PointCoord - 0.5;
  float dist = length(coord);
  if (dist > 0.5) discard; // Discard pixels outside the circle

  // Output final color (white particles)
  gl_FragColor = vec4(vec3(1.0), alphaFactor * alpha);
}
`

const starfieldVertex = `
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_strength;

varying vec3 vColor;
varying vec3 vPosition;

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
  newPosition += 0.0*move;

  // Final position
  // gl_PointSize = 50.0;
  vPosition = newPosition;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  gl_PointSize = 5.0;
}
`

function createStarfield() {
  const particlesCnt = 2500
  const posArray = new Float32Array(particlesCnt * 3)
  const container = document.querySelector('.particles-container')
  let mouseX = 0
  let mouseY = 0

  for (let i = 0; i < particlesCnt; i++) {
    // Random spherical distribution
    // const r = Math.cbrt(Math.random()) * 5 // Spread within a sphere of radius 5
    // const theta = Math.random() * Math.PI * 2
    // const phi = Math.acos(Math.random() * 2 - 1)

    // posArray[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    // posArray[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    // posArray[i * 3 + 2] = r * Math.cos(phi)

    // Random starfield
    posArray[i] = (Math.random() - 0.5) * 30 * (Math.random() - 2)
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

  mesh.renderOrder = 999
  let direction = 1
  mesh.tick = (delta) => {
    uniforms.u_time.value = clock.getElapsedTime()
    mesh.position.z += delta * mouseY * direction * 0.5
    // mesh.rotation.y = 0.25 * mouseX
    mesh.rotation.y += delta * mouseX * 0.025
    // mesh.rotation.x = -0.1 * mouseY
    mesh.rotation.x -= delta * mouseY * 0.025
    // mesh.position.x += delta * mouseX
    if (mesh.position.z >= 0) {
      direction = -1
    } else if (mesh.position.z <= -12) {
      direction = 1
    }
  }

  window.addEventListener('mousemove', (event) => {
    //prettier-ignore
    mouseX = event.clientX / container.clientWidth
    mouseY = 1 - event.clientY / container.clientHeight // Flip Y axis
    uniforms.u_mouse.value.x = mouseX
    uniforms.u_mouse.value.y = mouseY
  })
  // console.log('hey!')
  return mesh
}

export { createStarfield }
