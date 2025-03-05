import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function nav() {
  function isDesktop() {
    //prettier-ignore
    return window.innerWidth >= 991
  }
  // ELEMENTS
  if (isDesktop()) {
    const nav_container = document.querySelector('.nav-container')
    const button = document.querySelectorAll('.button')

    gsap.to(nav_container, {
      opacity: 1,
      duration: 1.5,
      ease: 'power2.inOut',
    })
    gsap.to(button, {
      scale: 1,
      opacity: 1,
      duration: 2,
      ease: 'power2.out',
    })

    console.log('ey!')
  }
}

export default nav
