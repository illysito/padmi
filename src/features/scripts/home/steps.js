import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function steps() {
  const steps_section = document.querySelector('.steps')
  const steps_wrapper = document.querySelectorAll('.steps-container')
  const glasses = document.querySelectorAll('.steps-txt-glass')
  const glassesArray = Array.from(glasses)
  const lines = document.querySelectorAll('.joint-line')
  const linesArray = Array.from(lines)
  // const wrappersArray = Array.from(wrappers)
  // const claim_img = document.querySelector('.iphone-img')
  const glassesArray_1 = [glassesArray[0], glassesArray[1], glassesArray[2]]
  const glassesArray_2 = [glassesArray[3], glassesArray[4], glassesArray[5]]
  const glassesArray_3 = [glassesArray[6], glassesArray[7], glassesArray[8]]
  const linesArray_1 = [linesArray[0], linesArray[1], linesArray[2]]
  const linesArray_2 = [linesArray[3], linesArray[4], linesArray[5]]
  const linesArray_3 = [linesArray[6], linesArray[7], linesArray[8]]

  console.log(linesArray)
  console.log(linesArray_1)

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: steps_wrapper,
      start: 'top top',
      end: '+=6000',
      scrub: true,
      pin: steps_section,
      markers: false,
      anticipatePin: 1,
    },
  })

  tl.to([glassesArray_1, linesArray_1], {
    opacity: 1,
    duration: 1.6,
  })
  tl.to(steps_wrapper, {
    xPercent: -100 / 3,
    duration: 1,
    ease: 'none',
  })
  tl.to([glassesArray_2, linesArray_2], {
    opacity: 1,
    duration: 1.6,
  })
  tl.to(steps_wrapper, {
    xPercent: -200 / 3,
    duration: 1,
    ease: 'none',
  })
  tl.to([glassesArray_3, linesArray_3], {
    opacity: 1,
    duration: 1.6,
  })
}

export default steps
