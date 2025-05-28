import gsap from 'gsap'
import {
  // Mesh,
  // MeshStandardMaterial,
  // MeshLambertMaterial,
  // MeshPhysicalMaterial,
  // MeshBasicMaterial,
  Group,
  BufferGeometry,
  BufferAttribute,
  ShaderMaterial,
  Points,
  Mesh,
  // Color,
  // Box3,
  Vector3,
  // TextureLoader,
} from 'three'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js'
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
  // const url_light =
  //   'https://raw.githubusercontent.com/illysito/NeueRegrade/d5a1e43aab6950247fdceecc09c74ff8e0172b80/Neue%20Regrade_Bold.json'

  const url_light =
    'https://raw.githubusercontent.com/illysito/padmi/refs/heads/main/MADE%20Outer%20Sans_Bold.json'

  const font = await loadFont(url_light)
  console.log(font.data)

  // create a geometry
  const textGeometry = new TextGeometry(text, {
    font: font,
    size: 2,
    height: 0.05,
  })
  textGeometry.scale(0.5, 0.5, 0.0075)

  textGeometry.computeBoundingBox()
  const box = textGeometry.boundingBox
  const centerX = (box.max.x + box.min.x) / 2
  const centerY = (box.max.y + box.min.y) / 2
  textGeometry.translate(-centerX, -centerY, 0)

  const tempMesh = new Mesh(textGeometry)
  const sampler = new MeshSurfaceSampler(tempMesh).build()

  const count = 30000 // Increase for more density
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const pos = new Vector3()
    sampler.sample(pos)
    positions[i * 3 + 0] = pos.x
    positions[i * 3 + 1] = pos.y
    positions[i * 3 + 2] = pos.z
  }

  const sizes = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    sizes[i] = 0.76 * (2.5 + Math.random() * 1.5)
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(positions, 3))
  geometry.setAttribute('aSize', new BufferAttribute(sizes, 1))

  const uniforms = {
    u_time: { value: 1600.0 + 100.0 * Math.random() },
    u_mouseX: { value: 0.0 },
    u_mouseY: { value: 0.0 },
    u_prevMouseX: { value: 0.0 },
    u_prevMouseY: { value: 0.0 },
  }

  const material = new ShaderMaterial({
    uniforms,
    vertexShader: `
      attribute float aSize;
      varying float vAlpha;
      varying vec3 vPosition;

      uniform float u_time;
      uniform float u_mouseX;
      uniform float u_mouseY;
      uniform float u_prevMouseX;
      uniform float u_prevMouseY;

      void main() {
        vAlpha = aSize / 4.0;
        vPosition = position;

        vec2 mouseDirection = vec2(u_mouseX - u_prevMouseX, u_mouseY - u_prevMouseY);
        vec3 pos = position;

        // Warp points by pushing them along mouse movement direction,
        // scaled by distance from mouse (optional for smoother effect)
        
        // Compute vector from point to mouse position in XY plane:
        vec2 pointXY = pos.xy;
        vec2 toMouse = pointXY - vec2(u_mouseX, u_mouseY);
      
        float distance = length(toMouse);
      
        // Optional: make warp stronger near mouse, fade out with distance
        float warpEffect = smoothstep(0.5, 0.0, distance);
      
        // Apply warp offset along mouse direction, scaled by warpStrength and distance effect
        float warpStrength = 4.0;
        pos.xy += mouseDirection * warpStrength * warpEffect;
      
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = aSize * (10.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying float vAlpha;
      varying vec3 vPosition;
      
      uniform float u_time;
      uniform float u_mouseX;
      uniform float u_mouseY;
      uniform float u_prevMouseX;
      uniform float u_prevMouseY;

      void main() {

        float dist = distance(gl_PointCoord, vec2(0.5));
        float alpha = smoothstep(0.48, 0.45, dist); // soft edge
        if (dist>0.5) discard;

        gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha * alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
  })

  const points = new Points(geometry, material)

  // const type = new Mesh(textGeometry, mat)
  const group = new Group()
  group.add(points)

  // place the text
  group.position.set(x, y, z)

  let counter = 0
  group.tick = (delta) => {
    counter += delta
    uniforms.u_time.value = (uniforms.u_time.value + delta) % 10000
    group.rotation.x = 0.15 * Math.sin(counter)

    // mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor
    // mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor
  }

  window.addEventListener('mousemove', (event) => {
    const mouseX = gsap.utils.mapRange(
      0,
      window.innerWidth,
      -5.0,
      5.0,
      event.clientX
    )
    //prettier-ignore
    const mouseY = gsap.utils.mapRange(0, window.innerHeight, 2.0, -2.0, event.pageY)
    // let mouseX = event.clientX
    // let mouseY = event.pageY

    uniforms.u_prevMouseX.value = uniforms.u_mouseX.value
    uniforms.u_prevMouseY.value = uniforms.u_mouseY.value

    uniforms.u_mouseX.value = mouseX
    uniforms.u_mouseY.value = mouseY
  })

  return group
}

export { createText }
