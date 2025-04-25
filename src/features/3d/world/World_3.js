import { createCamera } from '../components/camera.js'
import { createLight } from '../components/point_light.js'
import { createScene } from '../components/scene.js'
import { createText } from '../components/text.js'
import { Loop_2 } from '../systems/Loop_2.js'
import { createRenderer } from '../systems/Renderer.js'
import { Resizer } from '../systems/Resizer.js'

// let camera
// let scene
// let renderer
// let loop

class World_3 {
  // 1. Create an instance of the World app
  constructor(container) {
    this.camera = createCamera()
    this.scene = createScene()
    this.renderer = createRenderer()
    this.loop = new Loop_2(this.camera, this.scene, this.renderer)
    // adding canvas element to the webflow container
    container.append(this.renderer.domElement)

    this.initText('1 2 3')
    // this.initText('2')
    // this.initText('3')
    this.initLights()

    const resizer = new Resizer(container, this.camera, this.renderer)
    resizer.onResize = () => {
      this.render()
    }
  }

  async initText(text) {
    const type = await createText(text, 0, 0, 0)
    this.scene.add(type)
    this.loop.updatables.push(type)
  }

  initLights() {
    const light = createLight(-2, 2, 3, 20, 0xfffbf6)
    this.scene.add(light)
    // loop.updatables.push(light)
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

export { World_3 }
