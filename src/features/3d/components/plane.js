import gsap from 'gsap'
import html2canvas from 'html2canvas'
import { Vector2 } from 'three'
// import { MeshBasicMaterial } from 'three'
import { CanvasTexture, ShaderMaterial, PlaneGeometry, Mesh } from 'three'

//prettier-ignore
import { color_shift_frag, color_shift_vertex } from '../shaders/sh_color_shift.js'
import { warp_type_frag, warp_type_vertex } from '../shaders/sh_warp_type.js'

async function createPlane() {
  async function updateCanvasTexture(template) {
    //prettier-ignore
    // console.log(isLightMode)
    //prettier-ignore
    // const backgroundColor = isLightMode === true ? 'rgba(229, 231, 225)' : 'rgba(10, 11, 11)';
    const backgroundColor = 'rgba(0,0,1,0.001)'
    // const backgroundColor = null
    const renderedCanvas = await html2canvas(template, {
      backgroundColor: backgroundColor,
      width: template.offsetWidth,
      height: template.offsetHeight,
    })

    return { renderedCanvas, texture: new CanvasTexture(renderedCanvas) }
  }

  // const darkModeButton = document.querySelector('.darkmode-button')

  const template = document.getElementById('scene__template')
  let isLightMode = false
  //prettier-ignore
  let { renderedCanvas, texture } = await updateCanvasTexture(template, isLightMode)

  texture.anisotropy = 1
  texture.needsUpdate = true
  texture.premultiplyAlpha = true

  const canvasW = renderedCanvas.width
  const canvasH = renderedCanvas.height
  const aspect = canvasW / canvasH
  const planeH = 5.4
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
    u_velocityX: { value: 0.0 },
    u_velocityY: { value: 0.0 },
    u_texture: { value: texture },
    u_aspect: { value: [canvasW, canvasH] },
  }

  const fragmentShader = frag_shaders[0]

  const vertexShader = vert_shaders[0]

  const material = new ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    // transparent: true,
  })

  function handleModes() {
    isLightMode = !isLightMode
    localStorage.setItem('lightMode', isLightMode)
    // Toggle the dark-mode class on the body
    //prettier-ignore
    updateCanvasTexture(template, isLightMode).then(({ texture: updatedTexture }) => {
      gsap.to(uniforms.u_texture.value, {
        duration: 2.8,
        ease: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)', // Choose your preferred easing
        onUpdate: () => {
          // Update the texture on each animation frame
          uniforms.u_texture.value = updatedTexture
        },
        onStart: () => {
          updatedTexture.anisotropy = 1
          updatedTexture.needsUpdate = true
        },
      })
    })
  }

  // const meshMaterial = new MeshBasicMaterial({ map: texture })
  // console.log(meshMaterial)

  // Step 5: Create a Plane to Display the Shader
  const geometry = new PlaneGeometry(planeW, planeH)
  const mesh = new Mesh(geometry, material)

  mesh.tick = (delta) => {
    uniforms.u_time.value += 0.5 * delta
    mesh.rotation.y = gsap.utils.mapRange(0, 1, -0.025, 0.025, prevMouseX)
    mesh.rotation.x = gsap.utils.mapRange(0, 1, -0.025, 0.025, prevMouseY)
    mesh.position.x = gsap.utils.mapRange(0, 1, 0.05, -0.05, prevMouseX)
    // mesh.rotation.y = prevMouseX
    // console.log('ticking' + uniforms.u_time)
  }

  document.addEventListener('darkModeToggled', handleModes)

  let ticking = false
  let prevMouseX = 0
  let prevMouseY = 0
  window.addEventListener('mousemove', (event) => {
    if (!ticking) {
      requestAnimationFrame(() => {
        //prettier-ignore
        const mouseX = gsap.utils.mapRange(0, window.innerWidth, 0.0, 1.0, event.clientX)
        //prettier-ignore
        const mouseY = gsap.utils.mapRange(0, window.innerHeight, 0.0, 1.0, event.pageY)
        // Store previous values before updating
        const velocityX = mouseX - prevMouseX
        const velocityY = mouseY - prevMouseY
        uniforms.u_prevMouse.value.set(prevMouseX, prevMouseY)
        // Update current values
        uniforms.u_mouseX.value = mouseX
        uniforms.u_mouseY.value = mouseY
        uniforms.u_velocityX.value = velocityX
        uniforms.u_velocityY.value = velocityY
        // Set previous values for the next event trigger
        prevMouseX = mouseX
        prevMouseY = mouseY

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
