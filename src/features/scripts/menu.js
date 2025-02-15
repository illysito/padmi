import { gsap } from 'gsap'

function menu() {
  const button = document.querySelector('.ham-button')
  const nav_container = document.querySelector('.nav-container')

  let isClicked = false

  function handleMenu() {
    console.log(isClicked)
    if (!isClicked) {
      gsap.to(nav_container, {
        height: '97svh',
        duration: 1,
        ease: 'power2.inOut',
      })
    } else {
      gsap.to(nav_container, {
        height: '6svh',
        duration: 1,
        ease: 'power2.inOut',
      })
    }
    isClicked = !isClicked
  }
  // function hoverIn() { }

  // function hoverOut() { }

  // button.addEventListener('mouseenter', hoverIn)
  // button.addEventListener('mouseleave', hoverOut)
  button.addEventListener('click', handleMenu)
}

export default menu
