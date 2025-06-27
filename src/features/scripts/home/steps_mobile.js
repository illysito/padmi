import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function steps_mobile() {
  const steps_title = document.querySelector('.steps-head-mobile')
  const steps_heading = document.querySelectorAll('.steps-title-mobile')
  const dots = document.querySelectorAll('.step-dot-mobile')
  const steps_wrappers = document.querySelectorAll('.is--step-h-mob')
  const steps_descriptions = document.querySelectorAll('.steps-txt')
  const wrappers = document.querySelectorAll('.steps-txt-wrapper-mob')
  const images = document.querySelectorAll('.steps-iphone-img-mobile')

  console.log(steps_heading)

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

  steps_descriptions.forEach((desc) => {
    gsap.to(desc, {
      opacity: 1,
      yPercent: -100,
      scrollTrigger: {
        trigger: desc,
        start: 'top 80%',
        end: 'top 30%',
        markers: false,
      },
    })
  })

  const first_heading = steps_wrappers[0].firstElementChild
  console.log(first_heading.textContent)
  const first_dot = first_heading.nextElementSibling
  gsap.set(first_heading, {
    x: 16,
    color: '#ceff05',
    fontWeight: 500,
    duration: 0.4,
  })
  gsap.to(first_dot, {
    scale: 1,
    duration: 0.4,
    scrollTrigger: {
      trigger: first_dot,
      start: 'top 80%',
      end: 'top 30%',
    },
  })

  function movePhone(i) {
    gsap.to(images, {
      yPercent: -100 * i,
      duration: 0.8,
      ease: 'power1.inOut',
    })
  }

  let CLICKED = [1, 0, 0, 0]
  steps_wrappers.forEach((w, index) => {
    w.addEventListener('mouseover', (event) => {
      const h = event.currentTarget.firstElementChild
      const d = h.nextElementSibling
      if (CLICKED[index] == 0) {
        gsap.to(h, {
          x: 16,
          color: '#e5e7e1',
          fontWeight: 500,
          duration: 0.4,
        })
        gsap.to(d, {
          scale: 1,
          duration: 0.4,
        })
      }
    })
    w.addEventListener('mouseleave', (event) => {
      const h = event.currentTarget.firstElementChild
      const d = h.nextElementSibling
      if (CLICKED[index] == 0) {
        gsap.to(h, {
          x: 0,
          color: '#e5e7e1',
          duration: 0.4,
          fontWeight: 200,
        })
        gsap.to(d, {
          scale: 0,
          duration: 0.4,
        })
      }
    })
    w.addEventListener('click', (event) => {
      CLICKED = [0, 0, 0, 0]
      const h = event.currentTarget.firstElementChild
      const d = h.nextElementSibling
      gsap.to(steps_heading, {
        x: 0,
        color: '#e5e7e1',
        duration: 0.4,
        fontWeight: 200,
      })
      gsap.to(dots, {
        scale: 0,
        duration: 0.4,
      })
      gsap.to(h, {
        x: 16,
        color: '#ceff05',
        fontWeight: 500,
        duration: 0.4,
        ease: 'power1.inOut',
      })
      gsap.to(d, {
        scale: 1,
        duration: 0.4,
      })
      gsap.to(wrappers, {
        opacity: 0,
        duration: 0.4,
      })
      gsap.to(wrappers[index], {
        opacity: 1,
        duration: 0.4,
      })
      CLICKED[index] = 1
      movePhone(index)
    })
  })
}

export default steps_mobile
