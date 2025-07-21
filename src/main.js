import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// #region OLDER STATIC IMPORTS (Conserved for further debugging)
// import world from './features/3d/world/universe'
import world_2 from './features/3d/world/universe_2'
//
// CLUB
//
// import logoMarquee from './features/scripts/club/logo_marquee' // OK
// import numbers from './features/scripts/club/numbers' // OK
// import pricing from './features/scripts/club/pricing' // OK
// import restoreOpacity from './features/scripts/club/restore_opacity' // OK
// import splitClub from './features/scripts/club/split_club' // OK
// import splitClubMobile from './features/scripts/club/split_club_mobile' // OK
//
// CONTACT
//
// import contact from './features/scripts/contact/contact' // OK
// GENERAL
//
import buttons from './features/scripts/general/buttons'
import cookies from './features/scripts/general/cookies'
// import footer from './features/scripts/general/footer'
import menu from './features/scripts/general/menu'
import nav from './features/scripts/general/nav'
import preloader from './features/scripts/general/preloader'
//
// HOME
//
// import bento from './features/scripts/home/bento' // OK
// import claim from './features/scripts/home/claim' // OK
// import claim_mobile from './features/scripts/home/claim_mobile' // OK
// import hero from './features/scripts/home/hero' // OK
// import highlights from './features/scripts/home/highlights' // OK
// import scroll_line from './features/scripts/home/scroll_line' // OK
// import split from './features/scripts/home/split' // OK
// import stats from './features/scripts/home/stats' // OK
// import stats_mobile from './features/scripts/home/stats_mobile' // OK
// import steps from './features/scripts/home/steps' // OK
// import steps_mobile from './features/scripts/home/steps_mobile' // OK
// import tech from './features/scripts/home/tech' // OK
//
// WHERE
// import map from './features/scripts/where/map' // OK
//
// import particles from './features/scripts/z/particles'
//
// #endregion

import './styles/style.css'

function setViewportHeight() {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px)`)
}

function isDesktopOrTablet() {
  return window.innerWidth >= 768
}

function isMobile() {
  return window.innerWidth <= 478
}

function isPreloaderShown() {
  return localStorage.getItem('preloaderShown')
}

const body = document.body
const world_container = document.querySelector('.world-container')
const world_2_container = document.querySelector('.world-2-container')
const club_container = document.querySelector('.club-container')
const particles_container = document.querySelector('.particles-container')
const starfield_container = document.querySelector('.starfield-container')
const preloader_section = document.querySelector('.preloader')

// Needs STATIC IMPORT
function preload() {
  let shown = isPreloaderShown() === 'true'
  if (!shown && preloader_section) {
    preloader()
  } else if (shown && preloader_section) {
    preloader_section.style.zIndex = '-100'
  }
}

// Needs STATIC IMPORT
function runGeneralFunctions() {
  if (
    !body.classList.contains('body__legals') &&
    !body.classList.contains('body__aux')
  ) {
    cookies()
  }
  preload()
  world_2(world_2_container)
  nav()
  menu()
  buttons()
  // dark_mode()
}

async function runHomeFunctions() {
  // DYNAMIC IMPORTS
  const { default: world } = await import('./features/3d/world/universe')
  const { default: hero } = await import('./features/scripts/home/hero')
  const { default: split } = await import('./features/scripts/home/split')
  const { default: highlights } = await import(
    './features/scripts/home/highlights'
  )
  const { default: bento } = await import('./features/scripts/home/bento')
  const { default: scroll_line } = await import(
    './features/scripts/home/scroll_line'
  )
  const { default: tech } = await import('./features/scripts/home/tech')
  const { default: footer } = await import('./features/scripts/general/footer')

  // Conditional imports based on screen size
  let claim, steps, stats
  if (isDesktopOrTablet()) {
    ;({ default: claim } = await import('./features/scripts/home/claim'))
    ;({ default: steps } = await import('./features/scripts/home/steps'))
    ;({ default: stats } = await import('./features/scripts/home/stats'))
  } else {
    ;({ default: claim } = await import('./features/scripts/home/claim_mobile'))
    ;({ default: steps } = await import('./features/scripts/home/steps_mobile'))
    ;({ default: stats } = await import('./features/scripts/home/stats_mobile'))
  }

  // EXECUTION
  world(world_container, 0) // INDEX 0 --> Paddle & Type
  world(starfield_container, 4)
  hero()
  split()
  claim()
  steps()
  stats()
  highlights()
  bento()
  scroll_line()
  tech()
  footer()
}

async function runClubFunctions() {
  // DYNAMIC IMPORTS
  const { default: world } = await import('./features/3d/world/universe')
  const { default: restoreOpacity } = await import(
    './features/scripts/club/restore_opacity'
  )
  const { default: logoMarquee } = await import(
    './features/scripts/club/logo_marquee'
  )
  const { default: numbers } = await import('./features/scripts/club/numbers')
  const { default: pricing } = await import('./features/scripts/club/pricing')
  const { default: footer } = await import('./features/scripts/general/footer')
  let splitClub
  if (isMobile()) {
    ;({ default: splitClub } = await import(
      './features/scripts/club/split_club_mobile'
    ))
  } else {
    ;({ default: splitClub } = await import(
      './features/scripts/club/split_club'
    ))
  }

  // EXECUTION
  world(club_container, 1)
  restoreOpacity()
  splitClub()
  logoMarquee()
  numbers()
  pricing()
  footer()
}

async function runWhereFunctions() {
  const { default: map } = await import('./features/scripts/where/map')
  map()
}

async function runContactFunctions() {
  // DYNAMIC IMPORTS
  const { default: world } = await import('./features/3d/world/universe')
  const { default: contact } = await import(
    './features/scripts/contact/contact'
  )
  // EXECUTION
  world(particles_container, 3) // INDEX 1 --> Particles
  contact()
}

async function runLegalsFunctions() {
  const { default: footer } = await import('./features/scripts/general/footer')
  footer()
}

// Needs STATIC IMPORT

runGeneralFunctions()
if (body.classList.contains('body__home')) runHomeFunctions()
if (body.classList.contains('body__club')) runClubFunctions()
if (body.classList.contains('body__where')) runWhereFunctions()
if (body.classList.contains('body__contact')) runContactFunctions()
if (body.classList.contains('body__legals')) runLegalsFunctions()

window.addEventListener('load', () => {
  ScrollTrigger.refresh()
})

window.addEventListener('resize', setViewportHeight)
window.addEventListener('orientationchange', setViewportHeight)
