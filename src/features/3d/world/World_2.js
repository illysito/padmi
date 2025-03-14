import { createCamera } from '../components/camera.js'
import { createGradPlane } from '../components/gradient_plane.js'
import { createScene } from '../components/scene.js'
import { Loop_2 } from '../systems/Loop_2.js'
import { createRenderer } from '../systems/Renderer.js'
import { Resizer } from '../systems/Resizer.js'

// let camera
// let scene
// let renderer
// let loop

class World_2 {
  // 1. Create an instance of the World app
  constructor(container) {
    this.camera = createCamera()
    this.scene = createScene()
    this.renderer = createRenderer()
    this.loop = new Loop_2(this.camera, this.scene, this.renderer)
    // adding canvas element to the webflow container
    container.append(this.renderer.domElement)

    this.initGradPlane()
    // this.initStarfield()
    console.log('plane started!')

    const resizer = new Resizer(container, this.camera, this.renderer)
    resizer.onResize = () => {
      this.render()
    }
  }

  initGradPlane() {
    const gradPlane = createGradPlane()
    this.scene.add(gradPlane)
    this.loop.updatables.push(gradPlane)
    this.render()
  }

  // 2. Render the scene
  render() {
    this.renderer.render(this.scene, this.camera)
  }

  start() {
    this.loop.start()
  }

  stop() {
    this.loop.stop()
  }
}

export { World_2 }
