//#region IMPORTS
// bloom imports
import { Vector2 } from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js'

import { createCamera } from '../components/camera.js'
import { createPaddle } from '../components/paddle.js'
import { createParticles } from '../components/particles.js'
import { createLight } from '../components/point_light.js'
import { createScene } from '../components/scene.js'
import { createText } from '../components/text.js'
import { Loop_3 } from '../systems/Loop_3.js'
import { createRenderer } from '../systems/Renderer.js'
import { Resizer } from '../systems/Resizer.js'
//#endregion

class World_3 {
  // 1. Create an instance of the World app
  constructor(container) {
    this.camera = createCamera()
    this.scene = createScene()
    this.renderer = createRenderer()
    this.loop = new Loop_3(this.camera, this.scene, this.renderer)
    // adding canvas element to the webflow container
    container.append(this.renderer.domElement)

    this.initPostprocessing()
    this.initText('play smarter.')
    this.initPaddle()
    // this.initParticles()
    // this.initText('2')
    // this.initText('3')
    this.initLights()

    // const resizer = new Resizer(container, this.camera, this.renderer)
    // resizer.onResize = () => {
    //   this.render()
    // }
    // BLOOM RESIZER
    const resizer = new Resizer(container, this.camera, this.renderer)
    resizer.onResize = () => {
      this.composer.setSize(container.clientWidth, container.clientHeight)
      this.render()
    }
  }

  // BLOOM POST PROCESSING INIT
  initPostprocessing() {
    this.composer = new EffectComposer(this.renderer)

    const renderPass = new RenderPass(this.scene, this.camera)
    const bloomPass = new UnrealBloomPass(
      new Vector2(window.innerWidth, window.innerHeight),
      1.5, // strength
      0.4, // radius
      0.85 // threshold
    )
    const fxaaPass = new ShaderPass(FXAAShader)
    const pixelRatio = this.renderer.getPixelRatio()
    fxaaPass.material.uniforms['resolution'].value.x =
      1 / (window.innerWidth * pixelRatio)
    fxaaPass.material.uniforms['resolution'].value.y =
      1 / (window.innerHeight * pixelRatio)

    this.composer.addPass(renderPass)
    this.composer.addPass(bloomPass)
    this.composer.addPass(fxaaPass)

    // Override loop’s render if needed
    this.loop.renderOverride = () => {
      this.composer.render()
    }
  }

  async initText(text) {
    const type = await createText(text, 0, 0, 0)
    this.scene.add(type)
    this.loop.updatables.push(type)
  }

  async initPaddle() {
    const paddle = await createPaddle()
    this.scene.add(paddle)
    this.loop.updatables.push(paddle)
  }

  initLights() {
    const light = createLight(-2, 2, 3, 20, 0xfffbf6)
    this.scene.add(light)
    // loop.updatables.push(light)
  }

  initParticles() {
    const particles = createParticles()
    this.scene.add(particles)
    this.loop.updatables.push(particles)
  }

  // 2. Render the scene
  render() {
    // this.renderer.render(this.scene, this.camera)
    this.composer.render()
  }

  start() {
    this.loop.start()
  }

  stop() {
    this.loop.stop()
  }
}

export { World_3 }
