//LEGACY IMPORTS
import { createBall } from '../components/ball.js'
import { createCamera } from '../components/camera.js'
import { createDirLight } from '../components/directional_light.js'
import { createGradPlane } from '../components/gradient_plane.js'
import { createObject } from '../components/object.js'
import { createPaddle } from '../components/paddle.js'
import { createPadmiCam } from '../components/padmi_cam.js'
import { createPlane } from '../components/plane.js'
import { createLight } from '../components/point_light.js'
import { createScene } from '../components/scene.js'
import { createStarfield } from '../components/starfield.js'
import { createText } from '../components/text.js'
import { createTransmissionPlane } from '../components/transmission_plane.js'
import { Loop } from '../systems/Loop.js'
import { createRenderer } from '../systems/Renderer.js'
import { Resizer } from '../systems/Resizer.js'

// let camera
// let scene
// let renderer
// let loop

class World {
  // 1. Create an instance of the World app
  constructor(container, index) {
    this.camera = createCamera()
    this.scene = createScene()
    this.renderer = createRenderer()
    this.loop = new Loop(this.camera, this.scene, this.renderer)
    this.index = index
    // adding canvas element to the webflow container
    container.append(this.renderer.domElement)

    // INITS!!!!!
    if (index == 0) {
      this.initPlane()
      // this.initPaddle()
      this.initLights(-2, 2, 3, 20, 0xfffbf6, false)
      this.initStarfield(800)
    } else if (index == 1) {
      // this.initTransmissionPlane()
      // this.initPaddle()
      this.initLights(-1, 2.4, 0, 20, 0xfffbf6, true)
      this.initDirLights(1, 1, 0)
      this.initPadmiCam(0, -0.6, 0, 1)
      this.initPadmiCam(0, -0.6, 0, 1)
      // this.initStarfield(60)
    }

    //prettier-ignore
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
    const plane = await createPlane() // Await the result of createText
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

  initTransmissionPlane() {
    const transPlane = createTransmissionPlane()
    this.scene.add(transPlane)
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

  async initPadmiCam(x, y, z, id) {
    const cam = await createPadmiCam(x, y, z, id)
    this.scene.add(cam)
    this.loop.updatables.push(cam)
  }

  async initObject() {
    const object = await createObject()
    this.scene.add(object)
    this.loop.updatables.push(object)
  }

  async initText(text) {
    const type = await createText(text, 0, 0, 0)
    this.scene.add(type)
    // loop.updatables.push(type)
  }

  initStarfield(starCount) {
    const starfield = createStarfield(starCount)
    this.scene.add(starfield)
    this.loop.updatables.push(starfield)
    this.render()
  }

  initLights(x, y, z, int, color, isMove) {
    const light = createLight(x, y, z, int, color, isMove)
    this.scene.add(light)
    if (isMove) this.loop.updatables.push(light)
  }

  initDirLights(x, y, z) {
    const dirLight = createDirLight(x, y, z)
    this.scene.add(dirLight)
  }

  // 2. Render the scene
  render() {
    this.renderer.render(this.scene, this.camera)
    // this.composer.render()
  }

  start() {
    this.loop.start()
    console.log('World has resumed')
  }

  stop() {
    this.loop.stop()
    console.log('World has stopped')
  }
}

export { World }
