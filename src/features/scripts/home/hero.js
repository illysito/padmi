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
    const hero = document.querySelector('.hero')
    const claim = document.querySelector('.claim-heading')
    const download_wrapper = document.querySelector('.download-h-wrapper')
    const download = document.querySelectorAll('.download-heading')
    const badge = document.querySelectorAll('.app-badge')
    const world_container = document.querySelector('.world-container')
    const motto = document.querySelector('.motto-hero')
    const qr = document.querySelector('.qr')

    // SPLIT
    const splitClaim = new SplitType(claim, { types: 'lines' })

    splitClaim.lines.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      wrapper.style.display = 'block'

      line.parentNode.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    gsap.to(world_container, {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.7,
      ease: 'power2.inOut',
    })

    gsap.to([badge, download, motto], {
      scale: 1,
      opacity: 1,
      duration: 4,
      ease: 'power2.inOut',
    })

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

    download_wrapper.addEventListener('mouseover', () => {
      gsap.to(qr, {
        opacity: 1,
        duration: 0.4,
      })
      gsap.to(motto, {
        opacity: 0,
        duration: 0.4,
      })
    })
    download_wrapper.addEventListener('mouseleave', () => {
      gsap.to(qr, {
        opacity: 0,
        duration: 0.4,
      })
      gsap.to(motto, {
        opacity: 1,
        duration: 0.4,
      })
    })
  }
}

export default hero
