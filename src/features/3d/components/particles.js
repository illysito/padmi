import { MeshPhysicalMaterial, BoxGeometry, Mesh } from 'three'

function createParticles() {
  const geometry = new BoxGeometry(3, 3, 3)
  const material = new MeshPhysicalMaterial()
  const cube = new Mesh(geometry, material)

  let counter = 0
  cube.tick = (delta) => {
    counter += delta
    cube.rotation.x = 2.5 * Math.sin(counter)
    cube.rotation.y = 2.5 * Math.sin(counter)
    cube.rotation.z = 2.5 * Math.sin(counter)
  }

  return cube
}

export { createParticles }
