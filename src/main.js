import world from './features/3d/world/universe'
import buttons from './features/scripts/buttons'
import hero_parallax from './features/scripts/hero_parallax'

import './styles/style.css'

// MAIN! //
const body = document.body
const world_container = document.querySelector('.world-container')
const cursor = document.querySelector('.cursor')
let mouseX = 0
let mouseY = 0

function runHomeFunctions() {
  console.log('hey!')
  // handleHeroShader()
  if (world_container) {
    world(world_container, 0)
  }
  buttons()
  hero_parallax()
}

if (body.classList.contains('body__home')) runHomeFunctions()

if (cursor) {
  window.addEventListener('mousemove', function (e) {
    const cursor_r = cursor.getBoundingClientRect().width / 2
    mouseX = e.clientX
    mouseY = e.clientY
    cursor.style.left = mouseX - cursor_r + 'px'
    cursor.style.top = mouseY - cursor_r + 'px'
  })

  window.addEventListener('scroll', function () {
    const cursor_r = cursor.getBoundingClientRect().width / 2
    // const scrollTop = window.scrollY || document.documentElement.scrollTop
    cursor.style.left = mouseX - cursor_r + 'px'
    cursor.style.top = mouseY + window.scrollY - cursor_r + 'px'
  })
}
