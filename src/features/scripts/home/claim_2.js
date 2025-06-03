import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

function claim_2() {
  const overlay = document.querySelector('.scene-overlay-2')
  const claim_heading = document.querySelectorAll('.playsmarter-heading')
  const splitHeading = new SplitType(claim_heading, { types: 'chars' })
  splitHeading.chars.forEach((char) => {
    const wrapper = document.createElement('div')
    wrapper.style.overflow = 'hidden'
    wrapper.style.display = 'inline-block'
    wrapper.style.lineHeight = '0.98em'

    char.parentNode.insertBefore(wrapper, char)
    wrapper.appendChild(char)
  })

  const claim_p = document.querySelectorAll('.playsmarter-p')
  const splitP = new SplitType(claim_p, { types: 'lines' })
  splitP.lines.forEach((line) => {
    const wrapper = document.createElement('div')
    wrapper.style.overflow = 'hidden'
    wrapper.style.display = 'block'

    line.parentNode.insertBefore(wrapper, line)
    wrapper.appendChild(line)
  })

  gsap.from(splitHeading.chars, {
    xPercent: -120,
    duration: 0.8,
    ease: 'power1.out',
    stagger: 0.08,
  })
  gsap.to(claim_heading, {
    opacity: 1,
    duration: 0.8,
    ease: 'power1.out',
  })

  gsap.from(splitP.lines, {
    delay: 0.2,
    yPercent: 100,
    duration: 1.2,
    ease: 'power1.out',
    stagger: 0.2,
  })
  gsap.to(claim_p, {
    opacity: 1,
    duration: 0.8,
    ease: 'power1.out',
  })

  gsap.to(overlay, {
    opacity: 0,
    duration: 1.4,
    ease: 'power1.out',
  })
}

export default claim_2
