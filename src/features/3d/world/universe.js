import { World } from './World.js' // cambiar la ruta si fuera necesario

function world(container, shader_index) {
  // 1. Create an instance of the World app
  const world = new World(container, shader_index)
  // 2. Render the scene
  // world.start()
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          world.start() // Resume rendering when visible
        } else {
          world.stop() // Pause rendering when out of view
        }
      })
    },
    { threshold: 0.4 } // Adjust threshold for sensitivity
  )

  observer.observe(container)
}

export default world
