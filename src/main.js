import world from './features/3d/world/universe'
import world_2 from './features/3d/world/universe_2'
import bento from './features/scripts/bento'
// import bg_shader from './features/script_shaders/bg_shader_handler'
import buttons from './features/scripts/buttons'
// import dark_mode from './features/scripts/darkmode'
import hero from './features/scripts/hero'
import horizontal from './features/scripts/horizontal'
import map from './features/scripts/map'
import nav from './features/scripts/nav'
import parallax from './features/scripts/parallax'
import split from './features/scripts/split'
// import menu from './features/scripts/menu'
// import mouse from './features/scripts/mouse'

import './styles/style.css'

// MAIN! //
const body = document.body
const world_container = document.querySelector('.world-container')
const world_2_container = document.querySelector('.world-2-container')

function runHomeFunctions() {
  // bg_shader()
  // mouse()
  console.log('hey!')
  // if (world_container) {
  world(world_container, 0)
  // }
  hero()
  // menu()
  split()
  parallax()
  bento()
  horizontal()
}

function runWhereFunctions() {
  map()
}

function runGeneralFunctions() {
  world_2(world_2_container)
  nav()
  buttons()
}
// dark_mode()

runGeneralFunctions()
if (body.classList.contains('body__home')) runHomeFunctions()
if (body.classList.contains('body__where')) runWhereFunctions()
