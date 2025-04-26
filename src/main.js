// import gsap from 'gsap'

import world from './features/3d/world/universe'
import world_2 from './features/3d/world/universe_2'
// import world_3 from './features/3d/world/universe_3'
import bento from './features/scripts/bento'
// import bg_shader from './features/script_shaders/bg_shader_handler'
import buttons from './features/scripts/buttons'
import claim from './features/scripts/claim'
import contact from './features/scripts/contact'
// import dark_mode from './features/scripts/darkmode'
import hero from './features/scripts/hero'
// import horizontal from './features/scripts/horizontal'
import map from './features/scripts/mappp'
// import map_nav from './features/scripts/map_nav_fine'
import menu from './features/scripts/menu'
import nav from './features/scripts/nav'
// import parallax from './features/scripts/parallax'
import split from './features/scripts/split'
// import mouse from './features/scripts/mouse'

import './styles/style.css'

// MAIN! //
const body = document.body
const world_container = document.querySelector('.world-container')
const world_2_container = document.querySelector('.world-2-container')
// const world_3_container = document.querySelector('.world-3-container')
// const particles_container = document.querySelector('.particles-container')
const club_container = document.querySelector('.club-container')

function runGeneralFunctions() {
  world_2(world_2_container)
  nav()
  menu()
  buttons()
  // dark_mode()
}

function runHomeFunctions() {
  // bg_shader()
  // mouse()
  console.log('hey!')
  // if (world_container) {
  world(world_container, 0) // INDEX 0 --> Paddle & Type
  // }
  hero()
  split()
  // parallax()
  claim()
  bento()
  // world_3(world_3_container)
  // horizontal()
}

function runClubFunctions() {
  console.log('welcome to Padmi Club')
  world(club_container, 1)

  // SCROLL HELP!
  const scrollHelper = document.querySelector('.scroll-guide')
  // let scrollScale = 0
  window.addEventListener('scroll', () => {
    scrollHelper.textContent = Math.floor(window.scrollY)
    // scrollScale = gsap.utils.mapRange(0, 2000, 0, 2, scrollY)
    // scrollHelper.textContent = scrollScale
  })
}

function runWhereFunctions() {
  map()
}

function runContactFunctions() {
  // world(particles_container, 1) // INDEX 1 --> Particles
  contact()
}

function runLegalsFunctions() {
  console.log('welcome to Legals')
}

runGeneralFunctions()
if (body.classList.contains('body__home')) runHomeFunctions()
if (body.classList.contains('body__club')) runClubFunctions()
if (body.classList.contains('body__where')) runWhereFunctions()
if (body.classList.contains('body__contact')) runContactFunctions()
if (body.classList.contains('body__legals')) runLegalsFunctions()
