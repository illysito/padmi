import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function steps() {
  const steps_section = document.querySelector('.steps')
  const steps_wrapper = document.querySelectorAll('.steps-container')
  const glasses = document.querySelectorAll('.steps-txt-glass')
  const steps_title = document.querySelector('.steps-head')
  const steps_heading = document.querySelectorAll('.steps-title')
  const step_dots = document.querySelectorAll('.dot')
  const glassesArray = Array.from(glasses)
  const glassesArray_1 = [glassesArray[0], glassesArray[1], glassesArray[2]]
  const glassesArray_2 = [glassesArray[3], glassesArray[4], glassesArray[5]]
  const glassesArray_3 = [glassesArray[6], glassesArray[7]]
  const glassesArray_4 = [
    glassesArray[8],
    glassesArray[9],
    glassesArray[10],
    glassesArray[11],
  ]
  const headingsArray = Array.from(steps_heading)

  gsap.to(steps_title, {
    opacity: 1,
    yPercent: -100,
    scrollTrigger: {
      trigger: steps_title,
      start: 'top 80%',
      end: 'top 30%',
    },
  })

  steps_heading.forEach((h) => {
    gsap.to(h, {
      opacity: 1,
      yPercent: -100,
      scrollTrigger: {
        trigger: h,
        start: 'top 80%',
        end: 'top 30%',
      },
    })
  })

  gsap.to(step_dots, {
    opacity: 1,
    stagger: 0.1,
    scrollTrigger: {
      trigger: steps_heading,
      start: 'top 80%',
      end: 'top 30%',
    },
  })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: steps_wrapper,
      start: 'top top',
      end: '+=6000',
      scrub: 1,
      pin: steps_section,
      markers: false,
      // anticipatePin: 1,
    },
  })

  tl.to([glassesArray_1], {
    opacity: 1,
    duration: 1.6,
    stagger: 0.2,
  })
  tl.to(steps_wrapper, {
    xPercent: -100 / 4,
    duration: 1,
    ease: 'none',
  })
  tl.to(
    headingsArray[0],
    {
      color: '#e5e7e1',
      fontWeight: 200,
      duration: 0.6,
    },
    '<'
  )
  tl.to(
    headingsArray[1],
    {
      color: '#ceff05',
      fontWeight: 500,
      duration: 0.6,
    },
    '<'
  )
  tl.to([glassesArray_2], {
    opacity: 1,
    duration: 1.6,
    stagger: 0.2,
  })
  tl.to(steps_wrapper, {
    xPercent: -200 / 4,
    duration: 1,
    ease: 'none',
  })
  tl.to(
    headingsArray[1],
    {
      color: '#e5e7e1',
      fontWeight: 200,
      duration: 0.6,
    },
    '<'
  )
  tl.to(
    headingsArray[2],
    {
      color: '#ceff05',
      fontWeight: 500,
      duration: 0.6,
    },
    '<'
  )
  tl.to([glassesArray_3], {
    opacity: 1,
    duration: 1.6,
    stagger: 0.2,
  })
  tl.to(steps_wrapper, {
    xPercent: -300 / 4,
    duration: 1,
    ease: 'none',
  })
  tl.to(
    headingsArray[2],
    {
      color: '#e5e7e1',
      fontWeight: 200,
      duration: 0.6,
    },
    '<'
  )
  tl.to(
    headingsArray[3],
    {
      color: '#ceff05',
      fontWeight: 500,
      duration: 0.6,
    },
    '<'
  )
  tl.to([glassesArray_4], {
    opacity: 1,
    duration: 1.6,
    stagger: 0.2,
  })
}

export default steps
