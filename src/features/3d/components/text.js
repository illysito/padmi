import gsap from 'gsap'
import * as THREE from 'three'
import {
  // Mesh,
  // MeshStandardMaterial,
  // MeshLambertMaterial,
  // MeshPhysicalMaterial,
  // MeshBasicMaterial,
  PointsMaterial,
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

  // const url_light =
  //   'https://raw.githubusercontent.com/illysito/padmi/refs/heads/main/Mango%20Grotesque_Bold.json'

  const font = await loadFont(url_light)
  console.log(font.data)

  // create a geometry
  const textGeometry = new TextGeometry(text, {
    font: font,
    size: 1.8,
    // size: 1.4,
    // size: 3.4,
    height: 0.05,
  })
  textGeometry.scale(0.5, 0.5, 0.005)

  textGeometry.computeBoundingBox()
  const box = textGeometry.boundingBox
  const centerX = (box.max.x + box.min.x) / 2
  const centerY = (box.max.y + box.min.y) / 2
  textGeometry.translate(-centerX, -centerY, 0)

  const tempMesh = new Mesh(textGeometry)
  const sampler = new MeshSurfaceSampler(tempMesh).build()

  const count = 130000 // Increase for more density
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
    sizes[i] = 0.25 * (4.5 + Math.random() * 1.5)
  }

  const geometry = new BufferGeometry()

  // ATRIBTES
  geometry.setAttribute('position', new BufferAttribute(positions, 3))
  geometry.setAttribute(
    'aInitialPosition',
    new BufferAttribute(positions.slice(), 3)
  ) // ← clone original
  geometry.setAttribute('aSize', new BufferAttribute(sizes, 1))
  // easing
  const currentPositions = positions.slice()
  geometry.setAttribute(
    'aCurrentPosition',
    new BufferAttribute(currentPositions, 3).setUsage(THREE.DynamicDrawUsage)
  )

  const uniforms = {
    u_time: { value: 1600.0 + 100.0 * Math.random() },
    u_mouseX: { value: 0.0 },
    u_mouseY: { value: 0.0 },
    u_mouseZ: { value: 0.0 },
    u_prevMouseX: { value: 0.0 },
    u_prevMouseY: { value: 0.0 },
    u_effectSelector: { value: 1.0 },
    u_effectSelector2: { value: 0.0 },
  }

  const material = new ShaderMaterial({
    blending: THREE.AdditiveBlending,
    uniforms,
    vertexShader: `
      attribute float aSize;
      attribute vec3 aInitialPosition;
      attribute vec3 aCurrentPosition;

      varying float vAlpha;
      varying float vDisplacement;
      varying vec3 vPosition;

      uniform float u_time;
      uniform float u_mouseX;
      uniform float u_mouseY;
      uniform float u_mouseZ;
      uniform float u_prevMouseX;
      uniform float u_prevMouseY;
      uniform float u_effectSelector;
      uniform float u_effectSelector2;

      void main() {
        vAlpha = aSize / 2.0;
        vPosition = position;

        vec3 pos = aInitialPosition;
        pos = aCurrentPosition;
        vec3 mouse = vec3(u_mouseX, u_mouseY, u_mouseZ);

        // Get vector from point to mouse position (XY plane)
        vec3 toMouse = pos - mouse;
        if(u_effectSelector2 == 1.0){
          toMouse.y *= 1.5 * sin(0.22 * u_time);
          toMouse.x *= cos(0.45 * u_time);
        }
        float dist = length(toMouse);
      
        // Use smoothstep to create falloff based on distance
        float radius = 0.5 * sin(u_time) + 1.5; // control size of warp area 0.5
        float strength = 0.2 * sin(0.1 * u_time) + 1.2; // displacement intensity 0.2
      
        float influence = smoothstep(radius, 0.0, dist); // 1.0 near mouse, 0.0 at radius edge
      
        // Move outward from mouse (or inward by flipping sign)
        vec3 displaced = pos + normalize(toMouse) * influence * strength;
        vDisplacement = length(displaced - pos);
        pos = mix(pos, displaced, u_effectSelector * influence);
        // pos = mix(pos, aInitialPosition, 1.0 - 1.0);
      
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = aSize * (10.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying float vAlpha;
      varying float vDisplacement;
      varying vec3 vPosition;
      
      uniform float u_time;
      uniform float u_mouseX;
      uniform float u_mouseY;
      uniform float u_prevMouseX;
      uniform float u_prevMouseY;

      float hash(vec3 pos, float scale) {
        vec3 gridPos = floor(pos * scale);
        return fract(sin(dot(gridPos ,vec3(12.9898,78.233, 45.164))) * 43758.5453);
      }

      void main() {

        float dist = distance(gl_PointCoord, vec2(0.5));
        float alpha = smoothstep(0.48, 0.45, dist); // soft edge
        float displacementAlpha = clamp(vDisplacement * 2.0, 1.0, 2.5);
        if (dist>0.5) discard;

        vec3 glowColor = vec3(0.6, 0.6, 1.0); // warm glow
        // Random value per point
        float rnd = hash(vPosition, 20.0);
        glowColor = rnd < 0.05 ? vec3(0.6, 1.0, 0.2) : vec3(0.6, 0.6, 0.9); // green or white

        gl_FragColor = vec4(glowColor, vAlpha * displacementAlpha * alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
  })
  console.log(material)

  const material_2 = new PointsMaterial()
  console.log(material_2)

  const points = new Points(geometry, material)

  // const type = new Mesh(textGeometry, mat)
  const group = new Group()
  group.add(points)

  // place the text
  group.position.set(x, y + 0.32, z)

  let counter = 0
  let scrollY = 0
  group.tick = (delta) => {
    counter += delta
    uniforms.u_time.value = (uniforms.u_time.value + delta) % 10000
    console.log(scrollY)
    group.rotation.x = 0.15 * Math.sin(counter) - 0.005 * scrollY
    group.position.z = -0.005 * scrollY
    uniforms.u_mouseZ.value = 0 * Math.sin(0.1 * counter) + 0.1

    // EASING
    const posAttr = geometry.attributes.position
    const currentAttr = geometry.attributes.aCurrentPosition
    const initialAttr = geometry.attributes.aInitialPosition

    for (let i = 0; i < count * 3; i++) {
      // Ease current position back toward initial
      currentAttr.array[i] +=
        (initialAttr.array[i] - currentAttr.array[i]) * 0.02
    }

    posAttr.needsUpdate = true
    currentAttr.needsUpdate = true
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

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY
  })

  const effectButton = document.querySelector('.effect_button')
  const effectText = document.querySelector('.effect_text')
  let effectArray = [1.0, 0.0, -1.8, 0.0, 1.0, 1.0, -1.8, 1.0]
  let effectIndex = 0
  if (effectButton) {
    effectButton.addEventListener('click', () => {
      effectIndex += 2
      if (effectIndex == effectArray.length) {
        effectIndex = 0
      }
      let displayedEffectIndex = effectIndex + 1
      console.log(effectIndex)
      effectText.textContent = 'Efecto ' + (displayedEffectIndex / 2 + 0.5)
      uniforms.u_effectSelector.value = effectArray[effectIndex]
      uniforms.u_effectSelector2.value = effectArray[effectIndex + 1]
      console.log('hey')
    })
  }

  return group
}

export { createText }
