import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function horizontal() {
  const bento = document.querySelector('.bento')
  const bento_wrapper = document.querySelector('.bento_wrapper_1')

  // gsap.from(bento, {
  //   x: 200,
  //   // scale: 0.9,
  //   scrollTrigger: {
  //     trigger: bento,
  //     start: 'top bottom',
  //     end: 'top 12%',
  //     scrub: true,
  //     markers: true,
  //   },
  // })

  gsap.to(bento_wrapper, {
    xPercent: -60,
    scrollTrigger: {
      trigger: bento,
      start: 'top 12%',
      pin: true,
      scrub: 1,
      markers: false,
    },
  })
}

export default horizontal
