//prettier-ignore
import { gsap } from 'gsap'
import {
  MeshPhysicalMaterial,
  Color,
  Box3,
  Vector3,
  Group,
  //  BoxHelper,
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'

function createPadmiCam(x, y, z) {
  return new Promise((resolve) => {
    const loader = new GLTFLoader()
    const url =
      'https://raw.githubusercontent.com/illysito/padmi/324aaea6d43fb321156b1392ffe6a92d6d71aef0/Round_SecurityCam_V01.glb'

    loader.load(url, (gltf) => {
      const cam = gltf.scene
      cam.traverse((child) => {
        if (child.isMesh) {
          child.material = new MeshPhysicalMaterial({
            color: new Color(0x7511f6),
            emissive: new Color(0x7511f6),
            emissiveIntensity: 1.0,
            transmission: 1.0,
            thickness: 1.0,
            ior: 1.5,
            roughness: 0.0,
            metalness: 0.0,
            reflectivity: 0.6,
            // transparent: true,
          })
        }
      })

      // SCALE
      const scale = window.innerWidth / 4000
      cam.scale.set(scale, scale, scale)

      // GROUP
      const group = new Group()
      group.add(cam)

      // CENTER
      const box = new Box3().setFromObject(cam)
      const center = new Vector3()
      box.getCenter(center)
      cam.position.sub(center)

      // POSITION
      group.position.set(x, y, z)

      // ROTATION
      let toRad = Math.PI / 180
      cam.rotation.x = -40 * toRad

      // LOOP
      let scrollY = 0
      let scrollRotation = 0
      let scrollScale = 0

      let topScale = 0.6

      let damp = 0.1
      group.tick = (delta) => {
        // console.log(scrollY + delta)
        group.position.x = 0 * delta
        group.rotation.x = 0.01 * scrollRotation * damp
        group.rotation.z = 0.02 * scrollRotation * damp
        group.scale.set(
          1 + scrollScale,
          1 + scrollScale,
          1 + scrollScale
          // 1,
          // 1,
          // 1
        )
      }

      window.addEventListener('scroll', () => {
        scrollY = window.scrollY
        // if (scrollY < 2350) {
        scrollRotation = scrollY
        // }
        if (scrollY < 1000) {
          scrollScale = 0
        } else if (scrollY > 2000) {
          scrollScale = topScale
        } else {
          scrollScale = gsap.utils.mapRange(1000, 2000, 0, topScale, scrollY)
        }
      })

      // HELPER
      // const boxHelper = new BoxHelper(cam, 0xff0000)
      // group.add(boxHelper)

      resolve(group)
    })
  })
}

export { createPadmiCam }
