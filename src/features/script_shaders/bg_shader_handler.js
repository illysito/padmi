import GlslCanvas from 'glslCanvas'

import bg_shader_frag from './bg_shader_frag'

function bg_shader() {
  const canvas = document.getElementById('mouse-bg')
  if (!canvas) {
    console.error('Canvas element not found!')
    return
  }
  console.log(canvas)
  // console.log('zoom Object: ' + zoomRef.current)

  const gl = canvas.getContext('webgl')
  if (!gl) {
    console.error('WebGL not supported!')
  } else {
    console.log('WebGL is working!')
  }
  if (!canvas) {
    console.error('Canvas element not found!')
    return
  }

  const calcSize = function () {
    let ww = canvas.clientWidth
    let wh = canvas.clientHeight
    let dpi = window.devicePixelRatio

    canvas.width = ww * dpi
    canvas.height = wh * dpi
  }

  calcSize()

  const sandbox = new GlslCanvas(canvas)

  const fragment_shader = bg_shader_frag
  sandbox.load(fragment_shader)
  sandbox.setUniform('u_resolution', [canvas.width, canvas.height])
  //prettier-ignore
  sandbox.setUniform('u_texture', 'https://raw.githubusercontent.com/illysito/padmi/624850fc2d7f98fa20d31aedc82ffb97fa0fd27b/displacement_2.png')

  window.addEventListener('resize', function () {
    calcSize()
  })
}

export default bg_shader
