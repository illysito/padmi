import { gsap } from 'gsap'

function logoMarquee() {
  const container = document.querySelectorAll('.logos-container')

  container.forEach((c, index) => {
    let dir = 1
    index > 1 ? (dir = -1) : (dir = 1)
    gsap.to(c, {
      xPercent: -100 * dir,
      duration: 32,
      ease: 'linear',
      repeat: -1,
    })
  })
}

export default logoMarquee
