import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function highligths() {
  function isDesktopOrTablet() {
    return window.innerWidth >= 768
    // return true
  }
  // ELEMENTS
  if (isDesktopOrTablet()) {
    const highlight_section = document.querySelector('.highlights')
    const videos = document.querySelectorAll('.iphone-vid')
    const overlays = document.querySelectorAll('.iphone-vid-overlay')
    const headings = document.querySelectorAll('.highlight-h')

    gsap.to(highlight_section, {
      scrollTrigger: {
        trigger: highlight_section,
        start: 'top top',
        end: 'bottom -100%',
        pin: true,
      },
    })

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

    gsap.to(videos, {
      xPercent: -200,
      scrollTrigger: {
        trigger: highlight_section,
        start: 'top top',
        end: 'bottom -100%',
        scrub: true,
      },
    })
  }
}

export default highligths
