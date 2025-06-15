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

  function symmetry(array) {
    const newArray = []
    newArray[0] = array[9]
    newArray[1] = array[10]
    newArray[2] = array[11]
    newArray[3] = array[6]
    newArray[4] = array[7]
    newArray[5] = array[8]
    newArray[6] = array[12]
    newArray[7] = array[13]
    newArray[8] = array[14]
    newArray[9] = array[3]
    newArray[10] = array[4]
    newArray[11] = array[5]
    newArray[12] = array[15]
    newArray[13] = array[16]
    newArray[14] = array[17]
    newArray[15] = array[0]
    newArray[16] = array[1]
    newArray[17] = array[2]
    newArray[18] = array[18]
    newArray[19] = array[19]
    newArray[20] = array[20]
    return newArray
  }
  snippetsArray = symmetry(snippetsArray)
  columnsArray = shuffle(columnsArray)

  // pin
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
      start: 'top 68%',
      end: 'bottom top',
      scrub: 1,
      markers: false,
    },
  })

  // parallax
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
