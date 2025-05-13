import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function bento() {
  const bento_section = document.querySelector('.bento_section')
  const snippets = document.querySelectorAll('.snippet')
  const columns = document.querySelectorAll('.bento-column')
  // const central_column = document.querySelector('.is--central')
  let snippetsArray = Array.from(snippets)
  let columnsArray = Array.from(columns)

  // Shuffle columns
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }
  snippetsArray = shuffle(snippetsArray)
  columnsArray = shuffle(columnsArray)

  gsap.to(bento_section, {
    scrollTrigger: {
      trigger: bento_section,
      start: 'top top',
      end: 'bottom -50%',
      pin: true,
      scrub: 1,
      markers: false,
    },
  })

  gsap.to(snippetsArray, {
    opacity: 1,
    stagger: 0.6,
    duration: 0.6,
    scrollTrigger: {
      trigger: bento_section,
      start: 'top 25%',
      end: 'bottom top',
      scrub: 1,
      markers: false,
    },
  })

  columnsArray.forEach((col, index) => {
    // console.log(index)
    gsap.to(col, {
      y: 80 * index,
      scrollTrigger: {
        trigger: bento_section,
        start: 'bottom bottom',
        end: 'bottom -300%',
        // pin: true,
        scrub: 1,
        markers: false,
      },
    })
  })
}

export default bento
