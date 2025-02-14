import { createCamera } from '../components/camera.js'
import { createGradPlane } from '../components/gradient_plane.js'
import { createScene } from '../components/scene.js'
import { Loop } from '../systems/Loop.js'
import { createRenderer } from '../systems/Renderer.js'
import { Resizer } from '../systems/Resizer.js'

let camera
let scene
let renderer
let loop

class World_2 {
  // 1. Create an instance of the World app
  constructor(container) {
    camera = createCamera()
    scene = createScene()
    renderer = createRenderer()
    loop = new Loop(camera, scene, renderer)
    // adding canvas element to the webflow container
    container.append(renderer.domElement)

    this.initGradPlane()
    console.log('plane started!')

    const resizer = new Resizer(container, camera, renderer)
    resizer.onResize = () => {
      this.render()
    }
  }

  initGradPlane() {
    const gradPlane = createGradPlane()
    scene.add(gradPlane)
    loop.updatables.push(gradPlane)
    this.render()
  }

  // 2. Render the scene
  render() {
    renderer.render(scene, camera)
  }

  start() {
    loop.start()
  }

  stop() {
    loop.stop()
  }
}

export { World_2 }
