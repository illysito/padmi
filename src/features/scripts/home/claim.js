import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function claim() {
  const claim_section = document.querySelector('.claim')
  const claim_container = document.querySelector('.claim-container')
  const claim_img = document.querySelector('.claim-img')
  const low_line = document.querySelector('.low-line-2')
  const padel_span = document.querySelector('.padel-span')

  const titles = ['pádel', 'juego', 'partido']
  let isReversing = false
  let index = 0

  function handleTitle() {
    padel_span.textContent = titles[index]
    index++
    if (index > 2) index = 0
  }

  gsap.to(low_line, {
    opacity: 0,
    repeat: -1,
    yoyo: true, // Automatically reverses animation
    repeatDelay: 0.6,
    duration: 0.2, // Adjust as needed
    onRepeat: () => {
      isReversing = !isReversing
      if (isReversing) handleTitle()
    },
  })

  gsap.to(claim_container, {
    width: '100%',
    height: '100%',
    borderRadius: 0,
    scrollTrigger: {
      trigger: claim_section,
      start: 'top top',
      end: 'bottom top',
      pin: claim_section,
      scrub: 1,
      // markers: true,
    },
  })

  gsap.to(claim_img, {
    filter: 'saturate(70%)',
    scrollTrigger: {
      trigger: claim_section,
      start: 'top 80%',
      end: 'bottom bottom',
      scrub: 3,
      markers: false,
    },
  })

  gsap.to(claim_img, {
    scale: 1.2,
    y: 160,
    scrollTrigger: {
      trigger: claim_section,
      start: 'top 98%',
      end: 'bottom -100%',
      scrub: 1,
      // markers: true,
    },
  })
}

export default claim
