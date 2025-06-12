import {
  ShaderMaterial,
  DoubleSide,
  Color,
  TorusGeometry,
  TextureLoader,
  Group,
  Points,
  Mesh,
} from 'three'

function createTorus() {
  let size = 1

  const loader = new TextureLoader()
  const texture = loader.load(
    'https://raw.githubusercontent.com/illysito/lukyanov-illya/c780eee343953af30eabb41bc8c063f6443ece61/Noche63_2.png'
  )

  // const texture = loader.load(
  //   'https://raw.githubusercontent.com/illysito/lukyanov-illya/0ac9f07ff3a27d8cba97e91463a15697f9206352/Noche63_3.png'
  // )

  const torusGeometry = new TorusGeometry(2 * size, 0.8 * size, 30, 100)

  const uniforms = {
    u_time: { value: 1600.0 + 100.0 * Math.random() },
    u_texture: { value: texture },
  }
  const torusMaterial = new ShaderMaterial({
    uniforms,
    vertexShader: `
      varying vec3 vPosition;
      varying vec2 vUv;

      uniform float u_time;

      void main() {
        vec3 pos = position;

        float dimmer = 0.1;
        float amplitude = 0.25;
        pos.x += 0.05 * sin(2.0 * u_time) * sin(2.0 * u_time) * sin(pos.x * dimmer * u_time);
        pos.z += amplitude * sin(position.y + dimmer * u_time);
        pos.x += amplitude * sin(position.y + dimmer * u_time);

        vPosition = pos;
        vUv = uv;
      
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vPosition;
      varying vec2 vUv;
      
      uniform float u_time;
      uniform sampler2D u_texture;

      void main() {

        vec3 pos = vPosition;
        vec2 uv = vUv;

        vec2 repeat = vec2(4.0, 7.0);
        uv = fract(uv * repeat + vec2(0.35 * u_time, 0.5 * u_time));
        // uv.y += sin(u_time);

        vec4 txtr = texture2D(u_texture, uv);

        vec4 baseColor = vec4(0.2, 0.2, 1.0, 0.9);
        // if(txtr.w == 1.0){
        //   txtr += baseColor;
        // }
        gl_FragColor = txtr;

      }
    `,
    transparent: true,
    depthWrite: false,
    wireframe: false,
  })

  const torusMesh = new Mesh(torusGeometry, torusMaterial)

  let counter = 0
  let dimmer = 0.02
  let amplitude = 0.02
  torusMesh.tick = (delta) => {
    counter += delta
    uniforms.u_time.value = (uniforms.u_time.value + delta) % 10000

    torusMesh.rotation.y += amplitude * Math.sin(dimmer * counter)
    torusMesh.rotation.x += 0.2 * amplitude * Math.cos(dimmer * counter)
  }

  return torusMesh
}

export { createTorus }
