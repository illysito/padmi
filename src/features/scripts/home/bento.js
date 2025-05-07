import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function bento() {
  const bento_section = document.querySelector('.bento_section')
  const columns = document.querySelectorAll('.bento-column')
  // const central_column = document.querySelector('.is--central')
  let columnsArray = Array.from(columns)

  // Shuffle columns
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }
  columnsArray = shuffle(columnsArray)

  gsap.to(bento_section, {
    scrollTrigger: {
      trigger: bento_section,
      start: 'top top',
      end: 'bottom top',
      pin: true,
      scrub: 1,
      markers: false,
    },
  })

  gsap.to(columnsArray, {
    opacity: 1,
    stagger: 0.1,
    duration: 0.4,
    scrollTrigger: {
      trigger: bento_section,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      markers: false,
    },
  })
}

export default bento
