import { createBall } from '../components/ball.js'
import { createCamera } from '../components/camera.js'
// import { createDirLight } from '../components/directional_light.js'
import { createPlane } from '../components/plane.js'
import { createLight } from '../components/point_light.js'
import { createScene } from '../components/scene.js'
import { Loop } from '../systems/Loop.js'
import { createRenderer } from '../systems/Renderer.js'
import { Resizer } from '../systems/Resizer.js'

let camera
let scene
let renderer
let loop

class World {
  // 1. Create an instance of the World app
  constructor(container, shader_index) {
    camera = createCamera()
    scene = createScene()
    renderer = createRenderer()
    loop = new Loop(camera, scene, renderer)
    this.shader_index = shader_index
    // adding canvas element to the webflow container
    container.append(renderer.domElement)

    // INITS!!!!!
    this.initPlane()
    this.initBall()
    this.initLights()

    const resizer = new Resizer(container, camera, renderer)
    resizer.onResize = () => {
      this.render()
    }
  }

  // async initText() {
  //   const type = await createText('PADMI') // Await the result of createText
  //   scene.add(type) // Add the loaded text to the scene
  //   this.render()
  // }

  async initPlane() {
    const plane = await createPlane(this.shader_index) // Await the result of createText
    scene.add(plane)
    loop.updatables.push(plane) // Add the loaded text to the scene
    this.render()
  }

  initBall() {
    const ball = createBall()
    scene.add(ball)
    loop.updatables.push(ball)
  }

  initLights() {
    const light = createLight(-2, 2, 5, 20, 0xfffbf6)
    scene.add(light)
    // loop.updatables.push(light)
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

export { World }
