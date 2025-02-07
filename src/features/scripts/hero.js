import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

function hero() {
  // ELEMENTS
  const hero_section = document.querySelector('.scene__section')
  const nav_container = document.querySelector('.nav-container')
  const claim = document.querySelector('.claim-heading')
  const button = document.querySelectorAll('.button')
  const world_container = document.querySelector('.world-container')
  const splitClaim = new SplitType(claim, { types: 'lines' })

  // SPLIT
  splitClaim.lines.forEach((line) => {
    const wrapper = document.createElement('div')
    wrapper.style.overflow = 'hidden'
    wrapper.style.display = 'block'

    line.parentNode.insertBefore(wrapper, line)
    wrapper.appendChild(line)
  })

  // INTRO ANIMATION
  gsap.to(nav_container, {
    opacity: 1,
    duration: 1.5,
    ease: 'power2.inOut',
  })

  gsap.from(world_container, {
    scale: 0.8,
    duration: 1.7,
    ease: 'power2.inOut',
  })

  gsap.to(world_container, {
    opacity: 1,
    filter: 'blur(0px)',
    duration: 1.9,
    ease: 'power2.inOut',
  })

  gsap.to(claim, {
    scale: 1,
    opacity: 1,
    duration: 1.5,
    ease: 'power3.inOut',
  })

  gsap.from(splitClaim.lines, {
    yPercent: 100,
    duration: 1.8,
    ease: 'power3.inOut',
    stagger: 0.2,
  })

  gsap.to(button, {
    scale: 1,
    opacity: 1,
    duration: 2,
    ease: 'power2.out',
  })

  // PARALLAX
  gsap.to(hero_section, {
    y: 40,
    scrollTrigger: {
      trigger: hero_section,
      start: 'bottom 98%',
      end: 'bottom 50%',
      scrub: 2,
      markers: false,
    },
  })
}

export default hero
