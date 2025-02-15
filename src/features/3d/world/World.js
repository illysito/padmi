import { createBall } from '../components/ball.js'
import { createCamera } from '../components/camera.js'
import { createGradPlane } from '../components/gradient_plane.js'
// import { createDirLight } from '../components/directional_light.js'
import { createPaddle } from '../components/paddle.js'
import { createPlane } from '../components/plane.js'
import { createLight } from '../components/point_light.js'
import { createScene } from '../components/scene.js'
import { createText } from '../components/text.js'
import { Loop } from '../systems/Loop.js'
import { createRenderer } from '../systems/Renderer.js'
import { Resizer } from '../systems/Resizer.js'

// let camera
// let scene
// let renderer
// let loop

class World {
  // 1. Create an instance of the World app
  constructor(container, shader_index) {
    this.camera = createCamera()
    this.scene = createScene()
    this.renderer = createRenderer()
    this.loop = new Loop(this.camera, this.scene, this.renderer)
    this.shader_index = shader_index
    // adding canvas element to the webflow container
    container.append(this.renderer.domElement)

    // INITS!!!!!
    // this.initGradPlane()
    this.initPlane()
    // this.initText()
    // this.initBall()
    this.initPaddle()
    this.initLights()

    console.log(container)
    const resizer = new Resizer(container, this.camera, this.renderer)
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
    this.scene.add(plane)
    this.loop.updatables.push(plane) // Add the loaded text to the scene
    this.render()
  }

  initGradPlane() {
    const gradPlane = createGradPlane()
    this.scene.add(gradPlane)
    this.loop.updatables.push(gradPlane)
    this.render()
  }

  initBall() {
    const ball = createBall()
    this.scene.add(ball)
    this.loop.updatables.push(ball)
  }

  async initPaddle() {
    const paddle = await createPaddle()
    this.scene.add(paddle)
    this.loop.updatables.push(paddle)
  }

  async initText() {
    const type = await createText('Play smarter.', 0, 0, 0)
    this.scene.add(type)
    // loop.updatables.push(type)
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

export { World }
