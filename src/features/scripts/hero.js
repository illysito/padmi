import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

function hero() {
  // ELEMENTS
  const h1 = document.querySelectorAll('.h1')
  const h2 = document.querySelectorAll('.h2')
  const hero_section = document.querySelector('.scene__section')
  const nav_container = document.querySelector('.nav-container')
  const claim = document.querySelector('.claim-heading')
  const button = document.querySelectorAll('.button')
  const badge = document.querySelectorAll('.app-badge')
  const world_container = document.querySelector('.world-container')
  // to secretly fade out
  const template = document.querySelector('.scene-template')
  const overlay = document.querySelector('.scene-overlay')

  // SPLIT
  const splitClaim = new SplitType(claim, { types: 'lines' })
  // const splitH1 = new SplitType(h1, { types: 'chars' })
  const splitH2 = new SplitType(h2, { types: 'chars' })

  splitClaim.lines.forEach((line) => {
    const wrapper = document.createElement('div')
    wrapper.style.overflow = 'hidden'
    wrapper.style.display = 'block'

    line.parentNode.insertBefore(wrapper, line)
    wrapper.appendChild(line)
  })

  // gsap.from(splitH1.chars, {
  //   yPercent: -100,
  //   scaleY: 0.01,
  //   duration: 1.6,
  //   stagger: 0.08,
  //   ease: 'power3.out',
  // })

  // splitH1.chars.forEach((char) => {
  //   gsap.to(char, {
  //     yPercent: 100,
  //     stagger: 0.1,
  //     duration: 1.6,
  //     ease: 'power3.inOut',
  //   })
  // })

  gsap.from(h1, {
    yPercent: -100,
    scaleY: 0.01,
    duration: 1.6,
    stagger: 0.1,
    ease: 'power3.out',
  })

  gsap.to(splitH2.chars, {
    yPercent: 100,
    duration: 0.8,
    stagger: 0.1,
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
    onComplete: () => {
      gsap.to(template, {
        opacity: 0, // PONER Y QUITAR OVERLAY NEGRO
        duration: 0.3,
        onComplete: () => {
          gsap.to(overlay, {
            opacity: 0,
            duration: 0.3,
          })
        },
      })
    },
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

  gsap.to(badge, {
    scale: 1,
    opacity: 1,
    duration: 4,
    ease: 'power2.inOut',
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
