import gsap from 'gsap'
import { DoubleSide } from 'three'
//prettier-ignore
// import {
//   AdditiveBlending,
// } from 'three'
//prettier-ignore
import {
  // SphereGeometry, 
  Mesh,
  MeshPhysicalMaterial,
  ShaderMaterial,
  TorusGeometry,
  Group
}
  from 'three'

function createBall() {
  const size = 0.6
  // const limit = 0.9
  // let x_direction = false
  // let y_direction = false
  // GEOMETRY
  // const geometry = new SphereGeometry(size, 64, 64)
  const geometry = new TorusGeometry(size, 0.6, 32 * size, 100 * size)
  // MATERIAL
  const ball_material = new MeshPhysicalMaterial({
    color: 0xffeedd,
    transmission: 2.8, // Fully transmissive (glass-like)
    thickness: 0.4, // Thickness of the object (affects refraction)
    ior: 1.2, // Index of refraction (glass-like effect)
    roughness: 0.1, // Lower roughness for a clearer surface
    metalness: 0.0,
    reflectivity: 0.3,
    // clearcoat: 0,
    // clearcoatRoughness: 0.1,
    // sheen: 100,
    side: DoubleSide,
  })
  console.log(ball_material)

  const uniforms = {
    u_color: { value: [0.2, 1.0, 0.99] },
    u_time: { value: 0.0 },
    u_mouseX: { value: 0.0 },
    u_mouseY: { value: 0.0 },
  }

  const ballVertexShader = `
  #define NUM_OCTAVES 5

  varying vec2 vUv;
  uniform float u_time;
  uniform float u_mouseX;
  uniform float u_mouseY;
  
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
  
    // COORDS
  
    vUv = uv;
    vec3 pos = position;
  
    // MOUSE
  
    vec2 u_mouse = vec2(u_mouseX, u_mouseY);
  
    // MOVEMENT
  
    float radius = 0.5;
    float distortion = fbm(0.8 * pos + 0.8 * u_time);
  
    radius += mix(0.4, 0.8, distortion); 
  
    // pos *= radius;
  
    // OUTPUT
  
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
  `
  const ballFragmentShader = `
  uniform vec3 u_color;
  varying vec2 vUv;

  vec3 screenBlend(vec3 base, vec3 blend) {
      return 1.0 - (1.0 - base) * (1.0 - blend);
  }

  vec3 differenceBlend(vec3 base, vec3 blend) {
      return abs(base - blend);
  }

  void main() {
    vec3 xyz = gl_FragCoord.xyz;
    vec3 color = vec3(0.72,0.99,0.24);  // White seam color

    vec3 baseColor = color;          // Your defined color (e.g., vec3(0.72, 0.99, 0.24))
    vec3 blendColor = color; // Normalized screen coordinates

    vec3 finalColor = screenBlend(baseColor, blendColor); 

    gl_FragColor = vec4(color, 0.1);
  }
`
  const ball_material_2 = new ShaderMaterial({
    uniforms,
    vertexShader: ballVertexShader,
    fragmentShader: ballFragmentShader,
    transparent: true,
  })
  console.log(ball_material_2)
  // MESH
  const ball = new Mesh(geometry, ball_material)

  // THE SEAM
  // GEOMETRY
  const seamGeometry = new TorusGeometry(size, 1, 32 * size, 100 * size)
  // MATERIAL
  const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vPosition = position;

    // Apply S-curve distortion on the Y axis
    float sCurve = sin(vPosition.y * 6.28/2.0) * 0.45;  // Control the S-curve amplitude

    // Distort the X position of the torus to create the S-curve effect
    vPosition.z += sCurve;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
  }
  `
  const fragmentShader = `
  uniform vec3 u_color;
  varying vec2 vUv;

  void main() {
    vec3 color = vec3(1.0,1.0,1.0);  // White seam color
    gl_FragColor = vec4(color, 0.0);
  }
`
  const seamMaterial = new ShaderMaterial({
    uniforms: {
      u_color: { value: [0.2, 1.0, 0.99] },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: false,
  })
  // MESH
  const seamMesh = new Mesh(seamGeometry, seamMaterial)
  seamMesh.rotation.x = Math.PI / 2
  // GROUP
  const ballGroup = new Group()
  ball.position.z = 2
  ballGroup.add(ball) // Main ball
  // ballGroup.add(seamMesh)
  // LOOP
  ballGroup.tick = (delta) => {
    uniforms.u_time.value += 0.5 * delta
    ball.rotation.x += 0.5 * delta
    ball.rotation.y += 0.3 * delta
    ball.rotation.z += 0.8 * delta

    //prettier-ignore
    // if (ballGroup.position.x >= (2 * limit) || ballGroup.position.x <= (-2 * limit)) {
    //   x_direction = !x_direction
    // }
    // if (ballGroup.position.y >= limit || ballGroup.position.y <= -limit) {
    //   y_direction = !y_direction
    // }

    // if (!x_direction) {
    //   ballGroup.position.x += uniforms.u_mouseX.value * delta
    // } else {
    //   ballGroup.position.x -= uniforms.u_mouseX.value * delta
    // }
    // if (!y_direction) {
    //   ballGroup.position.y += uniforms.u_mouseY.value * delta
    // } else {
    //   ballGroup.position.y -= uniforms.u_mouseY.value * delta
    // }
    // uniforms.u_mouseX.value = mouseX
    // uniforms.u_mouseY.value = mouseY
    // console.log('ticking' + uniforms.u_time)
  }
  // EVENTS
  window.addEventListener('mousemove', (event) => {
    //prettier-ignore
    const mouseX = gsap.utils.mapRange(0, window.innerWidth, -1.0, 1.0, event.clientX)
    //prettier-ignore
    const mouseY = gsap.utils.mapRange(0, window.innerHeight, 1.0, -1.0, event.clientY)

    uniforms.u_mouseX.value = mouseX
    uniforms.u_mouseY.value = mouseY
    // console.log('mouseX: ' + mouseX + ' mouseY: ' + mouseY)
  })
  // OUTPUT
  return ballGroup
}

export { createBall }
