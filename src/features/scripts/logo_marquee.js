import { gsap } from 'gsap'

function logoMarquee() {
  const container = document.querySelectorAll('.logos-container')

  gsap.to(container, {
    xPercent: -100,
    duration: 32,
    ease: 'linear',
    repeat: -1,
  })
}

export default logoMarquee
