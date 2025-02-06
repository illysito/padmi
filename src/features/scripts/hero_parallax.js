import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function hero_parallax() {
  const hero_section = document.querySelector('.scene__section')
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

export default hero_parallax
