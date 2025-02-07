import world from './features/3d/world/universe'
import buttons from './features/scripts/buttons'
// import dark_mode from './features/scripts/darkmode'
import hero from './features/scripts/hero'

import './styles/style.css'

// MAIN! //
const body = document.body
const world_container = document.querySelector('.world-container')

function runHomeFunctions() {
  console.log('hey!')
  if (world_container) {
    world(world_container, 0)
  }
  buttons()
  hero()
}

// dark_mode()

if (body.classList.contains('body__home')) runHomeFunctions()
