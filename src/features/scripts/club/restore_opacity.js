import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

function restoreOpacity() {
  // ELEMENTS
  const three_container = document.querySelector('.club-container')
  const club_info = document.querySelector('.club-info-last')

  // RESTORE GRADIENTS
  gsap.to(three_container, {
    opacity: 0,
    scrollTrigger: {
      trigger: club_info,
      start: 'top top',
      end: 'bottom top',
      scrub: 3,
      // markers: true,
    },
  })
}

export default restoreOpacity
