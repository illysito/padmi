// import gsap from 'gsap'
//prettier-ignore
import {
  Mesh,
  MeshPhysicalMaterial,
  // DoubleSide,
  // Vector3,
  Group,
  Color,
} from 'three'
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

function createObject() {
  return new Promise((resolve) => {
    const loader = new STLLoader()
    //prettier-ignore
    const url = 'https://raw.githubusercontent.com/illysito/cosas/1d2b2a9851bdf7a1a07822c77e7cbe95278bc9a4/minitimple.stl' // OBJECT

    loader.load(url, (geometry) => {
      const material = new MeshPhysicalMaterial({
        color: new Color(0xffffff), // Keep it white or very light
        emissive: new Color(0x5511f6), // No emissive for glass
        // emissive: new Color(0xffffff), // No emissive for glass
        emissiveIntensity: 1.5, // Emissive isn't needed for glass
        transmission: 1.0,
        thickness: 2.0,
        ior: 1.5,
        roughness: 0.013,
        metalness: 0.0,
        reflectivity: 0.4,
      })

      const timple = new Mesh(geometry, material)

      // INITIAL SET UP
      const scale = 0.0075
      const group = new Group()
      group.add(timple)
      group.scale.set(scale, scale, scale)

      group.scale.set(scale, scale, scale)
      group.rotation.x = -Math.PI / 2

      geometry.computeBoundingBox()
      geometry.computeVertexNormals()
      // const center = geometry.boundingBox.getCenter(new Vector3())
      // geometry.center()
      // timple.position.set(-center.x, -center.y, -center.z + 0.5)

      // POSITION
      group.position.z = 2
      group.position.y = -2
      group.position.x = -1

      resolve(group)
      // ROTATION
      let toRad = Math.PI / 180
      // let lastMouseX = 0
      // // These will track the rotational speed in both axes
      // let rotationalSpeedX = 0

      // // Constants for acceleration, deceleration, and damping
      // const maxSpeed = 0.05 // Maximum rotational speed
      // const acceleration = 0.25 // How quickly the object accelerates to its maximum speed
      // const damping = 0.9 // How quickly it slows down when the mouse stops moving

      // let paddleRotationX = 0

      // // LOOP
      let counter = 0
      group.tick = (delta) => {
        counter += 0.5 * delta
        group.rotation.x = -90 * toRad + Math.sin(counter) * 20 * toRad
        group.rotation.y = -60 * toRad + Math.cos(counter) * 20 * toRad
        group.rotation.z = -30 * toRad + Math.cos(counter) * 20 * toRad
        // // Damping effect applied even if mouse is moving
        // rotationalSpeedX *= damping

        // // Smooth update of rotations with rotational speed
        // paddleRotationX += rotationalSpeedX
      }

      // ANIMATION
      // window.addEventListener('mousemove', (event) => {
      //   const currentMouseX = event.clientX

      //   // Calculate mouse movement (velocity)
      //   const deltaX = currentMouseX - lastMouseX

      //   // If there is movement, update rotational speed
      //   if (Math.abs(deltaX) > 6) {
      //     rotationalSpeedX += deltaX * acceleration
      //     // Cap the rotational speed to a maximum value
      //     // prettier-ignore
      //     rotationalSpeedX = Math.min(Math.max(rotationalSpeedX, -maxSpeed), maxSpeed)
      //   }

      //   // Update last mouse position
      //   lastMouseX = currentMouseX
      // })

      // window.addEventListener('scroll', () => {
      //   //prettier-ignore
      //   // const scrollY = gsap.utils.mapRange(0, window.innerHeight, 0, 100.0, window.scrollY)
      //   const scale = 0.005
      //   paddle.position.y -= window.scrollY * toRad * scale
      // })
      // Resolve the promise with the loaded group
      // resolve(timple)
    })
  })
}

export { createObject }
