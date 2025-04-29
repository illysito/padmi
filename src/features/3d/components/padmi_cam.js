//prettier-ignore
import { gsap } from 'gsap'
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
      // cam.traverse((child) => {
      //   if (child.isMesh) {
      //     child.material = new MeshPhysicalMaterial({
      //       color: new Color(0x000000),
      //       // emissie: new Color(0x00ff00),
      //       emissive: new Color(0x5511f6),
      //       emissiveIntensity: 0.12,
      //       // transmission: 1.0,
      //       // thickness: 2.0,
      //       // ior: 1.5,
      //       roughness: 0.0,
      //       metalness: 1.0,
      //       reflectivity: 0.9,
      //     })
      //   }
      // })
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

      // // CENTER
      // const box = new Box3().setFromObject(cam)
      // const center = new Vector3()
      // box.getCenter(center)
      // group.position.sub(center)

      // SCALE & POSITION
      const scale = window.innerWidth / 4000
      cam.scale.set(scale, scale, scale)
      cam.position.set(id, y, 0.8 * id)

      // POSITION
      // group.position.set(x, y, z)

      // ROTATION
      let toRad = Math.PI / 180
      cam.rotation.x = -40 * toRad

      // LOOP
      let counter = 0

      let scrollY = 0
      let scrollRotation = 0
      let scrollScale = 0

      let mouseX = 0
      let mouseY = 0

      let initialX = group.position.x
      let initialY = group.position.y
      let scrollPosition = 0

      let topScale = 0
      let topMove = 0

      let damp = 0.1
      group.tick = (delta) => {
        counter += delta
        // ROTATION
        group.rotation.x =
          0.03 * Math.sin(id * counter * 0.6) +
          0.01 * scrollRotation * id * damp
        group.rotation.y =
          0.025 * Math.cos(id * counter * 0.8) +
          0.01 * scrollRotation * id * damp
        group.rotation.z =
          0.03 * Math.sin(id * counter) + 0.02 * scrollRotation * id * damp
        // SCALE
        group.scale.set(1 + scrollScale, 1 + scrollScale, 1 + scrollScale)
        // POSITION
        group.position.x = 0.05 * id * mouseX + initialX + scrollPosition
        group.position.y = 0.05 * id * mouseY + initialY + 0.3 * scrollPosition
      }

      let prevScrollRotation
      let rotationFirstStop = 574
      // let rotationFirstResume = 874
      rotationFirstStop = 2050
      let rotationStopTrigger = 2050
      let scaleInitTrigger = 1000
      let scaleStopTrigger = 2000
      let moveInitTrigger = 1300
      let moveStopTrigger = 2050

      window.addEventListener('scroll', () => {
        scrollY = window.scrollY

        // ROTATION
        if (scrollY < rotationStopTrigger && scrollY < rotationFirstStop) {
          prevScrollRotation = scrollY
          scrollRotation = prevScrollRotation
        }
        if (scrollY < rotationStopTrigger && scrollY > rotationFirstStop) {
          scrollRotation = prevScrollRotation
        }

        // MOVE
        if (scrollY < moveInitTrigger && scrollY < rotationFirstStop) {
          scrollPosition = gsap.utils.mapRange(
            0,
            rotationFirstStop,
            0,
            0,
            scrollY
          )
        } else if (scrollY < moveInitTrigger && scrollY > rotationFirstStop) {
          scrollPosition = 0
        } else if (scrollY > moveStopTrigger) {
          scrollPosition = gsap.utils.mapRange(
            moveStopTrigger,
            2500,
            topMove,
            2 * (topMove + 2) * id,
            scrollY
          )
        } else {
          scrollPosition = gsap.utils.mapRange(
            moveInitTrigger,
            moveStopTrigger,
            0,
            topMove,
            scrollY
          )
        }

        // SCALE
        if (scrollY < scaleInitTrigger) {
          scrollScale = 0
        } else if (scrollY > scaleStopTrigger) {
          scrollScale = topScale
        } else {
          scrollScale = gsap.utils.mapRange(
            scaleInitTrigger,
            scaleStopTrigger,
            0,
            topScale,
            scrollY
          )
        }
      })

      window.addEventListener('mousemove', (event) => {
        mouseX = gsap.utils.mapRange(0, window.innerWidth, -1, 1, event.clientX)
        mouseY = gsap.utils.mapRange(
          0,
          window.innerHeight,
          -1,
          1,
          event.clientY
        )
      })
      // HELPER
      // const boxHelper = new BoxHelper(cam, 0xff0000)
      // group.add(boxHelper)
      group.position.z = -1
      resolve(group)
    })
  })
}

export { createPadmiCam }
