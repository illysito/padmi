// import { PointLight, PointLightHelper } from 'three'
import { PointLight } from 'three'
// import { DirectionalLight} from 'three'

function createLight(x, y, z, i, color) {
  // const light = new DirectionalLight('#fffbf6', 8)
  const light = new PointLight(color, i, 10)
  light.position.set(x, y, z)
  light.castShadow = false
  // const helper = new PointLightHelper(light, 1, 0xff0000)

  // light.tick = (delta) => {
  //   console.log('light tick & delta = ' + delta)
  //   // light.position.x += (targetX - light.position.x) * 0.05 * delta
  //   // light.position.x += (targetZ - light.position.y) * 0.05 * delta
  // }

  // return { light, helper }
  return light
}

export { createLight }
