import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

function restoreOpacity() {
  // ELEMENTS
  const three_container = document.querySelector('.club-container')
  const club_info = document.querySelector('.club-info-last')
  const scroll_icon = document.querySelector('.scroll-icon-hero')

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

  // SCROLL INVITATION
  let count = 0
  let hover_duration = 0.6
  const maxRepeats = 11
  gsap.to(scroll_icon, {
    opacity: 0,
    repeat: maxRepeats - 1, // Since the initial animation counts as 1
    yoyo: true,
    repeatDelay: hover_duration / 1.25,
    duration: 0.6,
    onRepeat: function () {
      count++
      // console.log(count)
      if (count >= maxRepeats) {
        gsap.set(scroll_icon, { opacity: 0 })
      }
    },
  })
}

export default restoreOpacity
