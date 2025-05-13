//prettier-ignore
// import { gsap } from 'gsap'
import {
  // MeshPhysicalMaterial,
  // Color,
  // Box3,
  // Vector3,
  Group,
  //  BoxHelper,
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'

function createPadmiCam(x, y, z, id) {
  return new Promise((resolve) => {
    const loader = new GLTFLoader()
    const url =
      'https://raw.githubusercontent.com/illysito/padmi/324aaea6d43fb321156b1392ffe6a92d6d71aef0/Round_SecurityCam_V01.glb'

    // const url =
    //   'https://cdn.jsdelivr.net/gh/illysito/padmi@main/objPaddle.glb'

    loader.load(url, (gltf) => {
      const cam = gltf.scene

      cam.traverse((child) => {
        if (child.isMesh) {
          // child.material.color.set(0xff0000)
          child.material.emissive.set(0x210053)
          // child.material.emissive.set(0xfffbf6)
          child.material.emissiveIntensity = 0.1 // Emissive intensity
          child.material.reflectivity = 1.0
          child.material.metalness = 1.0
          child.material.roughness = 0.1
        }
      })

      // GROUP
      const group = new Group()
      group.add(cam)

      // SCALE & POSITION
      const scale = window.innerWidth / 4000
      cam.scale.set(scale, scale, scale)
      cam.position.set(x, 4, 0 * id)

      // POSITION
      // group.position.set(x, y, z)

      // ROTATION
      let toRad = Math.PI / 180
      cam.rotation.x = -40 * toRad

      // LOOP
      let counter = 0
      let positionCounter = 4

      let scrollY = 0

      let scrollRotation = 0
      let rotationFactor = 0.01
      let scrollPosition = 0

      let rotationDamp = 0.25
      let positionDamp = 0.01
      group.tick = (delta) => {
        counter += delta
        positionCounter -= delta
        positionCounter -= 3.2 * positionCounter * delta
        // INITIAL ANIMATION
        if (positionCounter > -1) {
          cam.position.y = positionCounter
        }
        // ROTATION
        group.rotation.z =
          -0.02 * Math.sin(id * counter * 0.6) +
          -rotationFactor * scrollRotation * id * rotationDamp
        group.rotation.x =
          -0.005 * Math.cos(id * counter * 0.8) +
          -0.001 * scrollRotation * id * rotationDamp
        // group.rotation.z =
        //   0.08 * Math.sin(id * counter) + 0.02 * scrollRotation * id * damp
        group.position.y = scrollPosition * positionDamp
        console.log(group.position.y)
      }

      window.addEventListener('scroll', () => {
        scrollY = window.scrollY

        // ROTATION
        scrollRotation = scrollY

        // MOVE
        if (scrollY >= 5000) {
          scrollPosition = scrollY - 5000
        } else {
          scrollPosition = 0
        }
        // console.log(scrollRotation)
      })
      group.position.z = -1
      resolve(group)
    })
  })
}

export { createPadmiCam }
