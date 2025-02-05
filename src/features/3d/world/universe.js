import { World } from './World.js' // cambiar la ruta si fuera necesario

function world(container, shader_index) {
  // 1. Create an instance of the World app
  const world = new World(container, shader_index)
  // 2. Render the scene
  world.start()
}

export default world
