import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function claim() {
  const claim_text = document.querySelectorAll('.claim-heading-wrapper')
  const claim_img = document.querySelectorAll('.iphone-img')

  gsap.to(claim_text, {
    y: 60,
    scrollTrigger: {
      trigger: claim_text,
      start: 'top 30%',
      end: 'bottom top',
      scrub: 2,
      markers: false,
    },
  })

  claim_img.forEach((img, index) => {
    gsap.to(img, {
      y: -100 * -1.75 * index,
      scrollTrigger: {
        trigger: claim_text,
        start: 'top 50%',
        end: 'bottom -50%',
        scrub: 2,
        markers: false,
      },
    })
  })
}

export default claim
