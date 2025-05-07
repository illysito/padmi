import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

import world from './features/3d/world/universe'
import world_2 from './features/3d/world/universe_2'
// import world_3 from './features/3d/world/universe_3'
//
// import cameraTexts from './features/scripts/club/camera_texts'
import logoMarquee from './features/scripts/club/logo_marquee'
import numbers from './features/scripts/club/numbers'
//
import contact from './features/scripts/contact/contact'
//
import buttons from './features/scripts/general/buttons'
import menu from './features/scripts/general/menu'
import nav from './features/scripts/general/nav'
//
import bento from './features/scripts/home/bento'
import claim from './features/scripts/home/claim'
import hero from './features/scripts/home/hero'
import split from './features/scripts/home/split'
import stats from './features/scripts/home/stats'
import steps from './features/scripts/home/steps'
//
import map from './features/scripts/where/map'
//

import './styles/style.css'

// MAIN! //
const body = document.body
const world_container = document.querySelector('.world-container')
const world_2_container = document.querySelector('.world-2-container')
// const world_3_container = document.querySelector('.world-3-container')
// const particles_container = document.querySelector('.particles-container')
// const club_container = document.querySelector('.club-container')

function runGeneralFunctions() {
  world_2(world_2_container)
  nav()
  menu()
  buttons()
  // dark_mode()
}

function runHomeFunctions() {
  console.log('hey!')
  // if (world_container) {
  world(world_container, 0) // INaDEX 0 --> Paddle & Type
  // }
  hero()
  split()
  claim()
  stats()
  bento()
  steps()
}

function runClubFunctions() {
  // world(club_container, 1)
  // cameraTexts()
  logoMarquee()
  numbers()

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

window.addEventListener('load', () => {
  ScrollTrigger.refresh()
})
