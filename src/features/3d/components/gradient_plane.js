import gsap from 'gsap'
import { DoubleSide, ShaderMaterial, PlaneGeometry, Mesh } from 'three'

//prettier-ignore
import { grad_frag, grad_vertex } from '../shaders/sh_gradient.js'

function createGradPlane() {
  //prettier-ignore
  const planeH = 3 * 10
  const planeW = 3 * 10

  const uniforms = {
    u_time: { value: 1600.0 + 100.0 * Math.random() },
    u_mouseX: { value: 0.0 },
    u_mouseY: { value: 0.0 },
  }

  const fragmentShader = grad_frag

  const vertexShader = grad_vertex

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

  mesh.rotation.x = 114 * (Math.PI / 180)
  mesh.position.z = 8.5
  // mesh.position.z = -15
  mesh.position.y = 0.1

  mesh.tick = (delta) => {
    uniforms.u_time.value += 0.05 * delta
    // console.log('ticking' + uniforms.u_time)
  }

  window.addEventListener('mousemove', (event) => {
    //prettier-ignore
    const mouseX = gsap.utils.mapRange(0, window.innerWidth, 0.0, 1.0, event.clientX)
    //prettier-ignore
    const mouseY = gsap.utils.mapRange(0, window.innerHeight, 0.0, 1.0, event.clientY)

    uniforms.u_mouseX.value = mouseX
    uniforms.u_mouseY.value = mouseY
  })

  return mesh
}

export { createGradPlane }
