// import gsap from 'gsap'
//prettier-ignore
import {
  MeshPhysicalMaterial,
  // DoubleSide,
  Color,
} from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'

function createObject() {
  return new Promise((resolve) => {
    const loader = new OBJLoader()
    //prettier-ignore
    // const url = 'https://raw.githubusercontent.com/illysito/padmi/refs/heads/main/objPaddle.obj' // PADDLE
    const url = 'https://raw.githubusercontent.com/illysito/padmi/refs/heads/main/iPhone_6.obj' // OBJECT

    loader.load(url, (paddle) => {
      paddle.traverse((child) => {
        if (child.isMesh) {
          // Apply material to each mesh in the model
          child.material = new MeshPhysicalMaterial({
            color: new Color(0xffffff), // Keep it white or very light
            // emissive: new Color(0xfffbf6), // No emissive for glass
            // emissiveIntensity: 0.1, // Emissive isn't needed for glass

            transmission: 1.0, // Ensures light passes through
            thickness: 0.2, // Standard thickness (adjust if needed)
            ior: 0.5, // Real glass has an IOR of ~1.5
            roughness: 0.0, // Lower = shinier glass
            metalness: 0.0, // Glass isn't metallic
            reflectivity: 0.4, // High reflectivity for a glossy effect

            // side: DoubleSide, // Ensure both sides render properly
            // transparent: false, // Essential for transmission to work
          })
        }
      })
      // INITIAL SET UP

      // SCALE
      const scale = 10
      paddle.scale.set(scale, scale, scale)

      // POSITION
      paddle.position.z = 5

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

export { createObject }
