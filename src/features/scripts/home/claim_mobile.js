import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

function claim_mobile() {
  const download_icons = document.querySelectorAll('.app-badge')
  const claim_heading = document.querySelectorAll('.playsmarter-heading')
  const splitHeading = new SplitType(claim_heading, { types: 'chars' })
  splitHeading.chars.forEach((char) => {
    const wrapper = document.createElement('div')
    wrapper.style.overflow = 'hidden'
    wrapper.style.display = 'inline-block'
    wrapper.style.lineHeight = '0.8em'

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

  const iphone_img = document.querySelector('.iphone-img-mobile')
  gsap.to(iphone_img, {
    opacity: 1,
    scrollTrigger: {
      trigger: iphone_img,
      start: 'top 80%',
      end: 'bottom 40%',
      scrub: true,
    },
  })

  gsap.to(download_icons, {
    opacity: 1,
    duration: 1.4,
    ease: 'power1.inOut',
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
}

export default claim_mobile
