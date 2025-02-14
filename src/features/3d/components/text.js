import {
  Mesh,
  // MeshStandardMaterial,
  // MeshLambertMaterial,
  // MeshPhysicalMaterial,
  MeshBasicMaterial,
  ShaderMaterial,
  Group,
  // Box3,
  // Vector3,
  DoubleSide,
  // TextureLoader,
  Color,
} from 'three'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

import sh_type from '../shaders/sh_type'

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
    height: 0.001,
    curveSegments: 30,
    bevelEnabled: false,
    bevelSize: 0,
  })

  textGeometry.computeBoundingBox()
  const box = textGeometry.boundingBox
  const centerX = (box.max.x + box.min.x) / 2
  const centerY = (box.max.y + box.min.y) / 2
  textGeometry.translate(-centerX, -centerY, 0)

  const shaderMaterial = new ShaderMaterial({
    uniforms: {
      uRed: { value: new Color(0xff2233) }, // Front face color
      uBlue: { value: new Color(0x2323ff) }, // Back face color
      uYellow: { value: new Color(0xffb43b) }, // Text base color
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec2 vUv;
      varying vec3 vWorldPosition;
  
      void main() {
        vNormal = normalize(normal); // Pass the normal to the fragment shader
        vUv = uv; // Pass UV coordinates for grain effect
        vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz; // Transform position to world space
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: sh_type,
    side: DoubleSide,
  })
  console.log(shaderMaterial)

  const mat = new MeshBasicMaterial({ color: 0xff0000 })

  // create a Mesh containing the geometry and material
  // const type = new Mesh(textGeometry, shaderMaterial)
  const type = new Mesh(textGeometry, mat)
  const group = new Group()
  group.add(type)

  // place the text
  type.position.set(x, y, z - 50)

  // const box = new Box3().setFromObject(type)
  // const center = box.getCenter(new Vector3())
  // type.position.sub(center) // Center the text around the origin

  // group.tick = (delta) => {
  //   console.log('hey ' + delta)
  // }
  // onProgress callback
  console.log(type)
  return group
}

export { createText }
