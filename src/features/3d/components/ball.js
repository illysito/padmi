import gsap from 'gsap'
import * as THREE from 'three'
import {
  // Mesh,
  // MeshStandardMaterial,
  // MeshLambertMaterial,
  // MeshPhysicalMaterial,
  // MeshBasicMaterial,
  SphereGeometry,
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
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js'

function createBall(radius, cnt) {
  // create a geometry
  const ballGeometry = new SphereGeometry(radius, 30, 30)

  const tempMesh = new Mesh(ballGeometry)
  const sampler = new MeshSurfaceSampler(tempMesh).build()

  const count = cnt // Increase for more density
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    let pos = new Vector3()
    sampler.sample(pos)
    // pos *= radius
    positions[i * 3 + 0] = pos.x * radius
    positions[i * 3 + 1] = pos.y * radius
    positions[i * 3 + 2] = pos.z * radius
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
      #define NUM_OCTAVES 5

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

      float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
      vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
      vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

      float noise(vec3 p){
        vec3 a = floor(p);
        vec3 d = p - a;
        d = d * d * (3.0 - 2.0 * d);
    
        vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
        vec4 k1 = perm(b.xyxy);
        vec4 k2 = perm(k1.xyxy + b.zzww);
    
        vec4 c = k2 + a.zzzz;
        vec4 k3 = perm(c);
        vec4 k4 = perm(c + 1.0);
    
        vec4 o1 = fract(k3 * (1.0 / 41.0));
        vec4 o2 = fract(k4 * (1.0 / 41.0));
    
        vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
        vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);
    
        return o4.y * d.y + o4.x * (1.0 - d.y);
    }
    
    
    float fbm(vec3 x) {
      float v = 0.0;
      float a = 0.5;
      vec3 shift = vec3(100);
      for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(x);
        x = x * 2.0 + shift;
        a *= 0.5;
      }
      return v;
    }

      void main() {
        vAlpha = aSize / 2.0;
        vPosition = position;

        vec3 pos = aInitialPosition;
        pos = aCurrentPosition;
        vec3 mouse = vec3(u_mouseX, u_mouseY, u_mouseZ);

        float fbmNoise = fbm(position);
        float smoothMulti = 0.2 * sin(0.1 * u_time) + 2.6;
        // smoothMulti = 1.0;
        // Get vector from point to mouse position (XY plane)
        vec3 toMouse = pos - mouse;
        toMouse = fbmNoise * smoothMulti * vec3(position.x , position.y, position.z);
        if(u_effectSelector2 == 1.0){
          toMouse.y *= 1.5 * sin(0.22 * u_time);
          toMouse.x *= 0.3* cos(0.45 * u_time);
        }
        float dist = length(toMouse);
      
        // Use smoothstep to create falloff based on distance
        float radius = 0.5 * sin(u_time) + 1.5; // control size of warp area 0.5
        float strength = 0.4 * sin(0.1 * u_time) + 1.2; // displacement intensity 0.2
      
        float influence = smoothstep(radius, 0.0, dist); // 1.0 near mouse, 0.0 at radius edge
      
        // Move outward from mouse (or inward by flipping sign)
        vec3 displaced = pos + normalize(toMouse) * 2.0 * influence * strength;
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

      void main() {

        float dist = distance(gl_PointCoord, vec2(0.5));
        float alpha = smoothstep(0.48, 0.45, dist); // soft edge
        float displacementAlpha = clamp(vDisplacement * 2.0, 1.0, 2.5);
        if (dist>0.5) discard;

        vec3 glowColor = vec3(0.6, 0.6, 1.0); // warm glow

        gl_FragColor = vec4(glowColor, vAlpha * displacementAlpha * alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
  })
  // console.log(material)

  // const material_2 = new PointsMaterial()
  // console.log(material_2)

  const points = new Points(geometry, material)

  const group = new Group()
  group.add(points)

  let counter = 0
  let scrollY = 0
  group.tick = (delta) => {
    counter += delta
    uniforms.u_time.value = (uniforms.u_time.value + delta) % 10000
    group.rotation.x += 0.000001 * uniforms.u_time.value
    group.rotation.y += 0.000001 * uniforms.u_time.value
    group.rotation.z += 0.000001 * uniforms.u_time.value
    group.position.z = -0.005 * scrollY
    uniforms.u_mouseZ.value = 0.1 * Math.sin(0.1 * counter) + 0.1
  }

  const cont = document.querySelector('.starfield-container')
  cont.addEventListener('mousemove', (event) => {
    const mouseX = gsap.utils.mapRange(
      0,
      window.innerWidth,
      -5.0,
      5.0,
      event.clientX
    )
    //prettier-ignore
    // const mouseY = gsap.utils.mapRange(0, window.innerHeight, 2.0, -2.0, event.pageY)
    const mouseY = gsap.utils.mapRange(0, cont.clientHeight, 2.0, -2.0, event.clientY)
    // let mouseX = event.clientX
    // let mouseY = event.pageY

    uniforms.u_prevMouseX.value = uniforms.u_mouseX.value
    uniforms.u_prevMouseY.value = uniforms.u_mouseY.value

    uniforms.u_mouseX.value = mouseX
    uniforms.u_mouseY.value = mouseY

    // console.log(uniforms.u_mouseY.value)
  })

  // window.addEventListener('scroll', () => {
  //   scrollY = window.scrollY
  // })

  // const effectButton = document.querySelector('.effect_button')
  // const effectText = document.querySelector('.effect_text')
  // let effectArray = [1.0, 0.0, -1.8, 0.0, 1.0, 1.0, -1.8, 1.0]
  // let effectIndex = 0
  // effectButton.addEventListener('click', () => {
  //   effectIndex += 2
  //   if (effectIndex == effectArray.length) {
  //     effectIndex = 0
  //   }
  //   let displayedEffectIndex = effectIndex + 1
  //   console.log(effectIndex)
  //   effectText.textContent = 'Efecto ' + displayedEffectIndex
  //   uniforms.u_effectSelector.value = effectArray[effectIndex]
  //   uniforms.u_effectSelector2.value = effectArray[effectIndex + 1]
  //   console.log('hey')
  // })

  return group
}

export { createBall }
