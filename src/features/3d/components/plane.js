import gsap from 'gsap'
import html2canvas from 'html2canvas'
import { Vector2 } from 'three'
// import { MeshBasicMaterial } from 'three'
import { CanvasTexture, ShaderMaterial, PlaneGeometry, Mesh } from 'three'

//prettier-ignore
import { color_shift_frag, color_shift_vertex } from '../shaders/sh_color_shift.js'
import { warp_type_frag, warp_type_vertex } from '../shaders/sh_warp_type.js'

async function createPlane(shader_index) {
  const template = document.getElementById('scene__template')
  // const scale = 1.0 //50% res
  const renderedCanvas = await html2canvas(template, {
    backgroundColor: 'rgba(10, 11, 11)',
    width: template.offsetWidth,
    height: template.offsetHeight,
  })

  const texture = new CanvasTexture(renderedCanvas)
  texture.anisotropy = 1
  texture.needsUpdate = true

  const canvasW = renderedCanvas.width
  const canvasH = renderedCanvas.height
  const aspect = canvasW / canvasH
  const planeH = 4.8
  const planeW = planeH * aspect

  //prettier-ignore
  const frag_shaders = [
    warp_type_frag,
    color_shift_frag
  ]
  //prettier-ignore
  const vert_shaders = [
    warp_type_vertex,
    color_shift_vertex
  ]

  let prevMouse = new Vector2(0.0, 0.0)

  const uniforms = {
    u_time: { value: 0.0 },
    u_mouseX: { value: 0.0 },
    u_mouseY: { value: 0.0 },
    u_prevMouse: { value: prevMouse },
    u_texture: { value: texture },
    u_aspect: { value: [canvasW, canvasH] },
  }

  const fragmentShader = frag_shaders[shader_index]

  const vertexShader = vert_shaders[shader_index]

  const material = new ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
  })

  // const meshMaterial = new MeshBasicMaterial({ map: texture })
  // console.log(meshMaterial)

  // Step 5: Create a Plane to Display the Shader
  const geometry = new PlaneGeometry(planeW, planeH)
  const mesh = new Mesh(geometry, material)

  mesh.tick = (delta) => {
    uniforms.u_time.value += 0.5 * delta
    // console.log('ticking' + uniforms.u_time)
  }

  let ticking = false
  window.addEventListener('mousemove', (event) => {
    if (!ticking) {
      requestAnimationFrame(() => {
        //prettier-ignore
        const mouseX = gsap.utils.mapRange(0, window.innerWidth, 0.0, 1.0, event.clientX)
        //prettier-ignore
        const mouseY = gsap.utils.mapRange(0, window.innerHeight, 0.0, 1.0, event.clientY)

        const inertiaFactor = 0.99
        //prettier-ignore
        const inertiaMouseX = gsap.utils.interpolate(prevMouse.x, mouseX, inertiaFactor)
        //prettier-ignore
        const inertiaMouseY = gsap.utils.interpolate(prevMouse.y, mouseY, inertiaFactor)

        uniforms.u_prevMouse.value.set(inertiaMouseX, inertiaMouseY)
        uniforms.u_mouseX.value = inertiaMouseX
        uniforms.u_mouseY.value = inertiaMouseY

        prevMouse.set(inertiaMouseX, inertiaMouseY)

        ticking = false
      })
      ticking = true
    }
  })

  // async function updateTexture() {
  //   const updatedCanvas = await html2canvas(heroElement, {
  //     backgroundColor: '#0e0e0e',
  //     width: heroElement.offsetWidth, // or any specific width
  //     height: heroElement.offsetHeight,
  //   })
  //   texture.image = updatedCanvas
  //   texture.needsUpdate = true
  //   requestAnimationFrame(updateTexture)
  // }

  // updateTexture()

  return mesh
}

export { createPlane }
