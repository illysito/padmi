// import gsap from 'gsap'
// import { DoubleSide } from 'three'
//prettier-ignore
// import {
//   AdditiveBlending,
// } from 'three'
//prettier-ignore
import {
  // SphereGeometry, 
  BoxGeometry,
  PlaneGeometry,
  Mesh,
  MeshPhysicalMaterial,
  MeshBasicMaterial,
  // ShaderMaterial,
  // TorusGeometry,
  Color,
  Group
}
  from 'three'

function createBall() {
  const size = window.innerWidth / 800
  console.log(size)
  // GEOMETRY
  // const geometry = new SphereGeometry(size, 64, 64)
  const geometry = new BoxGeometry(size, size, size, 100 * size)
  // MATERIAL
  const ball_material = new MeshPhysicalMaterial({
    color: new Color(0xffffff),
    // emissie: new Color(0x00ff00),
    emissive: new Color(0x5511f6),
    emissiveIntensity: 0.5,
    transmission: 1.0,
    thickness: 2.0,
    ior: 1.5,
    roughness: 0.013,
    metalness: 0.0,
    reflectivity: 0.4,
    transparent: true, // Enable transparency
    // opacity: 0.8,
    // transparent: true,
  })

  const ball = new Mesh(geometry, ball_material)

  // Create something behind it (like a simple box or plane)
  const backgroundMaterial = new MeshBasicMaterial({
    color: 0x0000ff, // This is a very dark color with alpha 0
    transparent: true, // Make the material transparent
    opacity: 0,
  }) // Green background
  const backgroundGeometry = new PlaneGeometry(10, 10)
  const backgroundMesh = new Mesh(backgroundGeometry, backgroundMaterial)
  backgroundMesh.position.set(0, 0, -7.5) // Behind the text

  // GROUP
  const ballGroup = new Group()
  ballGroup.add(ball, backgroundMesh) // Main ball
  // ballGroup.add(seamMesh)
  // LOOP
  ballGroup.tick = (delta) => {
    ball.rotation.x += 0.5 * delta
    ball.rotation.y += 0.3 * delta
    ball.rotation.z += 0.8 * delta
  }
  // OUTPUT
  return ballGroup
}

export { createBall }
