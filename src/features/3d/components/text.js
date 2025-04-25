import {
  Mesh,
  // MeshStandardMaterial,
  // MeshLambertMaterial,
  MeshPhysicalMaterial,
  // MeshBasicMaterial,
  Group,
  Color,
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
    size: 2,
    height: 0.05, // Moderate extrusion — try 0.01 to 0.1
    // curveSegments: 10,
    // bevelEnabled: true,
    // bevelThickness: 0.005, // Smaller than height, not microscopic
    // bevelSize: 0.002, // Looks good around 0.002–0.01 depending on size
    // bevelSegments: 3,
  })
  textGeometry.scale(1, 1, 0.0075)

  textGeometry.computeBoundingBox()
  const box = textGeometry.boundingBox
  const centerX = (box.max.x + box.min.x) / 2
  const centerY = (box.max.y + box.min.y) / 2
  textGeometry.translate(-centerX, -centerY, 0)

  // textGeometry.computeBoundingBox()
  // console.log(textGeometry.boundingBox)

  // const mat = new MeshBasicMaterial({ color: 0xff00ff })
  const mat = new MeshPhysicalMaterial({
    color: new Color(0xffffff),
    // emissie: new Color(0x00ff00),
    emissive: new Color(0x5511f6),
    emissiveIntensity: 0.5,
    transmission: 1.0,
    thickness: 2.0,
    ior: 1.5,
    roughness: 0.013,
    metalness: 0.0,
    reflectivity: 0.4,
  })

  // create a Mesh containing the geometry and material
  // const type = new Mesh(textGeometry, shaderMaterial)
  const type = new Mesh(textGeometry, mat)
  // type.position.z += 0
  // type.rotation.x += 6
  const group = new Group()
  group.add(type)

  // place the text
  group.position.set(x, y, z)

  // const box = new Box3().setFromObject(type)
  // const center = box.getCenter(new Vector3())
  // type.position.sub(center) // Center the text around the origin
  // let mouse = 0
  let counter = 0
  group.tick = (delta) => {
    counter += delta
    // console.log(' hey ' + delta + mouse)
    // type.position.z = delta * 0.01 * mouse
    type.rotation.x = 0.15 * Math.sin(counter)
    type.rotation.y = 0.25 * Math.sin(counter)
    type.rotation.z = 0.25 * Math.sin(counter)
    console.log(type.rotation.x)
  }
  // window.addEventListener('mousemove', (event) => {
  //   //prettier-ignore
  //   mouse = event.clientX
  // })

  return group
}

export { createText }
