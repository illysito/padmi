import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

import world from './features/3d/world/universe'
import world_2 from './features/3d/world/universe_2'
import world_3 from './features/3d/world/universe_3'
// CLUB
import logoMarquee from './features/scripts/club/logo_marquee'
import numbers from './features/scripts/club/numbers'
import pricing from './features/scripts/club/pricing'
import restoreOpacity from './features/scripts/club/restore_opacity'
import splitClub from './features/scripts/club/split_club'
// CONTACT
import contact from './features/scripts/contact/contact'
// GENERAL
import buttons from './features/scripts/general/buttons'
import cookies from './features/scripts/general/cookies'
import footer from './features/scripts/general/footer'
import menu from './features/scripts/general/menu'
import nav from './features/scripts/general/nav'
// HOME
import bento from './features/scripts/home/bento'
import claim from './features/scripts/home/claim'
import claim_mobile from './features/scripts/home/claim_mobile'
import hero from './features/scripts/home/hero'
import highlights from './features/scripts/home/highlights'
import scroll_line from './features/scripts/home/scroll_line'
import split from './features/scripts/home/split'
import stats from './features/scripts/home/stats'
import steps from './features/scripts/home/steps_vert'
import tech from './features/scripts/home/tech'
// WHERE
import map from './features/scripts/where/map'
//
// import particles from './features/scripts/z/particles'
//

import './styles/style.css'

function setViewportHeight() {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px)`)
}

window.addEventListener('resize', setViewportHeight)
window.addEventListener('orientationchange', setViewportHeight)

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
const particles_container = document.querySelector('.particles-container')
const starfield_container = document.querySelector('.starfield-container')

function runGeneralFunctions() {
  world_2(world_2_container)
  nav()
  menu()
  buttons()
  // dark_mode()
}

function runHomeFunctions() {
  // if (world_container) {
  world(world_container, 0) // INDEX 0 --> Paddle & Type
  world(starfield_container, 4)
  // particles()
  // }
  hero()
  split()
  if (isDesktopOrTablet()) {
    claim()
  } else {
    claim_mobile()
    console.log('claim 2 is running!')
  }
  stats()
  highlights()
  bento()
  steps()
  scroll_line()
  tech()
  footer()
}

function runClubFunctions() {
  world(club_container, 1)
  restoreOpacity()
  splitClub()
  logoMarquee()
  numbers()
  pricing()
  footer()

  // SCROLL HELP!
  // const scrollHelper = document.querySelector('.scroll-guide')
  // // let scrollScale = 0
  // window.addEventListener('scroll', () => {
  //   scrollHelper.textContent = Math.floor(window.scrollY)
  //   // scrollScale = gsap.utils.mapRange(0, 2000, 0, 2, scrollY)
  //   // scrollHelper.textContent = scrollScale
  // })
  // gsap.to(scrollHelper, {
  //   opacity: 0,
  //   scrollTrigger: {
  //     trigger: '.elements',
  //     start: 'top 50%',
  //     end: 'top top',
  //     scrub: true,
  //   },
  // })
}

function runWhereFunctions() {
  map()
}

function runContactFunctions() {
  world(particles_container, 3) // INDEX 1 --> Particles
  contact()
}

function runLegalsFunctions() {
  footer()
}

function runAuxFunctions() {
  console.log('Aux!')
  // world_2(world_2_container)
  world_3(world_3_container, 1)
}

if (!body.classList.contains('body__legals')) {
  setTimeout(() => {
    cookies()
  }, 1200)
}

if (!body.classList.contains('body__aux')) runGeneralFunctions()
if (body.classList.contains('body__home')) runHomeFunctions()
if (body.classList.contains('body__club')) runClubFunctions()
if (body.classList.contains('body__where')) runWhereFunctions()
if (body.classList.contains('body__contact')) runContactFunctions()
if (body.classList.contains('body__legals')) runLegalsFunctions()
if (body.classList.contains('body__aux')) runAuxFunctions()

window.addEventListener('load', () => {
  ScrollTrigger.refresh()
})
