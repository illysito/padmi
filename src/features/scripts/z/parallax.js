import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function parallax() {
  const img = document.querySelectorAll('.img-test')

  gsap.to(img, {
    y: -40,
    scrollTrigger: {
      trigger: img,
      start: 'top 70%',
      end: 'bottom 20%',
      scrub: 3,
      markers: false,
    },
  })
}

export default parallax
