import {
  Mesh,
  // MeshStandardMaterial,
  // MeshLambertMaterial,
  // MeshPhysicalMaterial,
  MeshBasicMaterial,
  Group,
  // Box3,
  // Vector3,
  // TextureLoader,
} from 'three'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

function loadFont(url) {
  return new Promise((resolve, reject) => {
    const loader = new FontLoader()
    loader.load(
      url,
      (font) => resolve(font), // Resolve with the loaded font
      undefined,
      (error) => reject(error) // Reject on error
    )
  })
}

async function createText(text, x, y, z) {
  // font loading
  // resource URL
  const url_light =
    'https://raw.githubusercontent.com/illysito/NeueRegrade/d5a1e43aab6950247fdceecc09c74ff8e0172b80/Neue%20Regrade_Bold.json'

  // const url_black =
  //   'https://github.com/illysito/padmi/raw/6703294c14ea57964c65242a559de75860e3412c/QuantaGroteskPro-ExtraLight.ttf'

  const font = await loadFont(url_light)
  // create a geometry
  const textGeometry = new TextGeometry(text, {
    font: font,
    size: 1,
    height: 0.01,
    curveSegments: 30,
    bevelEnabled: true,
    bevelSize: 1,
  })

  textGeometry.computeBoundingBox()
  const box = textGeometry.boundingBox
  const centerX = (box.max.x + box.min.x) / 2
  const centerY = (box.max.y + box.min.y) / 2
  textGeometry.translate(-centerX, -centerY, 0)

  const mat = new MeshBasicMaterial({ color: 0xff00ff })

  // create a Mesh containing the geometry and material
  // const type = new Mesh(textGeometry, shaderMaterial)
  const type = new Mesh(textGeometry, mat)
  const group = new Group()
  group.add(type)

  // place the text
  group.position.set(x, y, z)

  // const box = new Box3().setFromObject(type)
  // const center = box.getCenter(new Vector3())
  // type.position.sub(center) // Center the text around the origin
  let mouse
  group.tick = (delta) => {
    console.log('hey ' + delta)
    group.position.x += mouse * delta
  }
  window.addEventListener('mousemove', (event) => {
    //prettier-ignore
    mouse = event.clientX
  })

  return group
}

export { createText }
