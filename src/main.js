// import world from './features/3d/world/universe'
import world_2 from './features/3d/world/universe_2'
// import bg_shader from './features/script_shaders/bg_shader_handler'
import buttons from './features/scripts/buttons'
// import dark_mode from './features/scripts/darkmode'
import hero from './features/scripts/hero'
// import mouse from './features/scripts/mouse'

import './styles/style.css'

// MAIN! //
const body = document.body
// const world_container = document.querySelector('.world-container')
const world_2_container = document.querySelector('.world-2-container')

function runHomeFunctions() {
  // bg_shader()
  // mouse()
  console.log('hey!')
  // if (world_container) {
  // world(world_container, 0)
  world_2(world_2_container)
  // }
  buttons()
  hero()
}

// dark_mode()

if (body.classList.contains('body__home')) runHomeFunctions()
