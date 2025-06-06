import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

function hero() {
  function isDesktopOrTablet() {
    return window.innerWidth >= 768
    // return true
  }
  // ELEMENTS
  if (isDesktopOrTablet()) {
    const h1 = document.querySelectorAll('.h1')
    // const h2 = document.querySelectorAll('.h2')
    const hero = document.querySelector('.hero')
    // const hero_section = document.querySelector('.scene__section')
    // const nav_container = document.querySelector('.nav-container')
    const claim = document.querySelector('.claim-heading')
    const download = document.querySelector('.download-heading')
    // const button = document.querySelectorAll('.button')
    const badge = document.querySelectorAll('.app-badge')
    const world_container = document.querySelector('.world-container')
    // to secretly fade out
    const template = document.querySelector('.scene-template')
    const overlay = document.querySelector('.scene-overlay')

    // SPLIT
    const splitClaim = new SplitType(claim, { types: 'lines' })

    splitClaim.lines.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      wrapper.style.display = 'block'

      line.parentNode.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    gsap.from(h1, {
      yPercent: -100,
      scaleY: 0.01,
      duration: 1.6,
      stagger: 0.1,
      ease: 'power3.out',
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

    gsap.to([badge, download], {
      scale: 1,
      opacity: 1,
      duration: 4,
      ease: 'power2.inOut',
    })

    // PARALLAX
    // gsap.to(hero_section, {
    //   y: 40,
    //   // scale: 0.9,
    //   scrollTrigger: {
    //     trigger: hero_section,
    //     start: 'bottom 98%',
    //     end: 'bottom 50%',
    //     scrub: 2,
    //     markers: false,
    //   },
    // })
    gsap.to(hero, {
      autoAlpha: 0,
      scrollTrigger: {
        trigger: hero,
        start: 'bottom 98%',
        end: 'bottom 30%',
        scrub: 1,
        markers: false,
      },
    })
  }
}

export default hero
