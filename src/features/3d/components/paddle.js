// import gsap from 'gsap'
//prettier-ignore
import {
  MeshPhysicalMaterial,
  DoubleSide,
  Color,
} from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'

function createPaddle() {
  return new Promise((resolve) => {
    const loader = new OBJLoader()
    //prettier-ignore
    const url = 'https://raw.githubusercontent.com/illysito/padmi/refs/heads/main/objPaddle.obj' // PADDLE
    // const url = 'https://raw.githubusercontent.com/illysito/padmi/refs/heads/main/Iphone%20seceond%20version%20finished.obj' // IPHONE

    loader.load(url, (paddle) => {
      paddle.traverse((child) => {
        if (child.isMesh) {
          // Apply material to each mesh in the model
          child.material = new MeshPhysicalMaterial({
            color: 0xffeedd,
            // color: 0x2255ffdd,
            // emissive: new Color(0x220088), // Or any desired color
            emissive: new Color(0xfffbf6),
            // emissive: new Color(0xcebbff),
            emissiveIntensity: 0.1,
            transmission: 1.8,
            thickness: 1.8,
            ior: 1.5,
            roughness: 0.2,
            metalness: 0.0,
            reflectivity: 0.3,
            side: DoubleSide,
          })
        }
      })
      // INITIAL SET UP

      // SCALE
      const scale = 0.23
      paddle.scale.set(scale, scale, scale)

      // POSITION
      paddle.position.z = 2

      // ROTATION
      let toRad = Math.PI / 180
      let lastMouseX = 0
      // These will track the rotational speed in both axes
      let rotationalSpeedX = 0

      // Constants for acceleration, deceleration, and damping
      const maxSpeed = 0.05 // Maximum rotational speed
      const acceleration = 0.25 // How quickly the object accelerates to its maximum speed
      const damping = 0.9 // How quickly it slows down when the mouse stops moving

      let paddleRotationX = 0

      // LOOP
      let counter = 0
      paddle.tick = (delta) => {
        counter += 0.5 * delta
        paddle.rotation.x = -90 * toRad + Math.sin(counter) * 20 * toRad
        paddle.rotation.y = -60 * toRad + Math.cos(counter) * 20 * toRad
        paddle.rotation.z = paddleRotationX // Apply rotation to X axis

        // Damping effect applied even if mouse is moving
        rotationalSpeedX *= damping

        // Smooth update of rotations with rotational speed
        paddleRotationX += rotationalSpeedX
      }

      // ANIMATION
      window.addEventListener('mousemove', (event) => {
        const currentMouseX = event.clientX

        // Calculate mouse movement (velocity)
        const deltaX = currentMouseX - lastMouseX

        // If there is movement, update rotational speed
        if (Math.abs(deltaX) > 6) {
          rotationalSpeedX += deltaX * acceleration
          // Cap the rotational speed to a maximum value
          // prettier-ignore
          rotationalSpeedX = Math.min(Math.max(rotationalSpeedX, -maxSpeed), maxSpeed)
        }

        // Update last mouse position
        lastMouseX = currentMouseX
      })

      // window.addEventListener('scroll', () => {
      //   //prettier-ignore
      //   // const scrollY = gsap.utils.mapRange(0, window.innerHeight, 0, 100.0, window.scrollY)
      //   const scale = 0.005
      //   paddle.position.y -= window.scrollY * toRad * scale
      // })
      // Resolve the promise with the loaded group
      resolve(paddle)
    })
  })
}

export { createPaddle }
