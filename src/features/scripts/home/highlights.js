import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function isDesktopOrTablet() {
  return window.innerWidth >= 768
  // return true
}

function highligths() {
  const highlight_section = document.querySelector('.highlights')
  const videos = document.querySelectorAll('.iphone-vid')
  const headings = document.querySelectorAll('.highlight-h')

  if (isDesktopOrTablet()) {
    gsap.to(highlight_section, {
      scrollTrigger: {
        trigger: highlight_section,
        start: 'top top',
        end: 'bottom -100%',
        pin: true,
      },
    })
  }

  headings.forEach((h) => {
    gsap.to(h, {
      yPercent: -100,
      opacity: 1,
      scrollTrigger: {
        trigger: headings,
        start: 'top 75%',
      },
    })
  })

  if (isDesktopOrTablet()) {
    gsap.to(videos, {
      xPercent: -200,
      scrollTrigger: {
        trigger: highlight_section,
        start: 'top top',
        end: 'bottom -100%',
        scrub: true,
      },
    })
  } else {
    gsap.to(videos, {
      xPercent: -200,
      scrollTrigger: {
        trigger: highlight_section,
        start: 'top 80%',
        end: 'top -20%',
        scrub: true,
      },
    })
  }
}

export default highligths
