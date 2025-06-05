import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

import world from './features/3d/world/universe'
import world_2 from './features/3d/world/universe_2'
import world_3 from './features/3d/world/universe_3'
//
import logoMarquee from './features/scripts/club/logo_marquee'
import numbers from './features/scripts/club/numbers'
import restoreOpacity from './features/scripts/club/restore_opacity'
import splitClub from './features/scripts/club/split_club'
//
import contact from './features/scripts/contact/contact'
//
import buttons from './features/scripts/general/buttons'
import menu from './features/scripts/general/menu'
import nav from './features/scripts/general/nav'
//
import bento from './features/scripts/home/bento'
import claim from './features/scripts/home/claim'
import claim_2 from './features/scripts/home/claim_2'
import hero from './features/scripts/home/hero'
import split from './features/scripts/home/split'
import stats from './features/scripts/home/stats'
import steps from './features/scripts/home/steps'
//
import map from './features/scripts/where/map'
//
// import particles from './features/scripts/z/particles'
//

import './styles/style.css'

function isDesktopOrTablet() {
  return window.innerWidth >= 768
  // return true
}

// MAIN! //
const body = document.body
const world_container = document.querySelector('.world-container')
const world_2_container = document.querySelector('.world-2-container')
const world_3_container = document.querySelector('.world-3-container')
const club_container = document.querySelector('.club-container')

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
  world(world_container, 0) // INDEX 0 --> Paddle & Type
  // particles()
  // }
  hero()
  split()
  if (isDesktopOrTablet()) {
    claim()
  } else {
    claim_2()
  }
  stats()
  bento()
  steps()
}

function runHomeFunctions2() {
  console.log('hey!')
  // if (world_container) {
  world(world_container, 2) // INDEX 0 --> Paddle & Type
  // particles()
  // }
  hero()
  split()
  claim()
  claim_2()
  stats()
  bento()
  steps()
}

function runClubFunctions() {
  world(club_container, 1)
  restoreOpacity()
  splitClub()
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
  gsap.to(scrollHelper, {
    opacity: 0,
    scrollTrigger: {
      trigger: '.elements',
      start: 'top 50%',
      end: 'top top',
      scrub: true,
    },
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

function runAuxFunctions() {
  console.log('Aux!')
  world_2(world_2_container)
  world_3(world_3_container)
}

if (!body.classList.contains('body__aux')) runGeneralFunctions()
if (body.classList.contains('body__home')) runHomeFunctions()
if (body.classList.contains('body__home__2')) runHomeFunctions2()
if (body.classList.contains('body__club')) runClubFunctions()
if (body.classList.contains('body__where')) runWhereFunctions()
if (body.classList.contains('body__contact')) runContactFunctions()
if (body.classList.contains('body__legals')) runLegalsFunctions()
if (body.classList.contains('body__aux')) runAuxFunctions()

window.addEventListener('load', () => {
  ScrollTrigger.refresh()
})
