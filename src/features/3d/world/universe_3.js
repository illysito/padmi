import { World_3 } from './World_3' // cambiar la ruta si fuera necesario

function world_3(container, index) {
  // 1. Create an instance of the World app
  const world = new World_3(container, index)
  // 2. Render the scene
  world.start()
}

export default world_3
