import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

function pricing() {
  // ELEMENTS
  const price_h = document.querySelectorAll('.price-h')
  const price_desc = document.querySelectorAll('.price-description')
  const button_txt = document.querySelectorAll('.button-h')
  const features_p = document.querySelectorAll('.features-p')
  const price_p = document.querySelectorAll('.price-p')
  const box = document.querySelectorAll('.price-bento')

  gsap.to(box, {
    opacity: 1,
    duration: 0.8,
    ease: 'power1.out',
    scrollTrigger: {
      trigger: price_h,
      start: 'top bottom',
      end: 'top 85%',
      markers: false,
    },
  })

  gsap.to(price_h, {
    opacity: 1,
    yPercent: -100,
    duration: 0.8,
    ease: 'power1.out',
    scrollTrigger: {
      trigger: price_h,
      start: 'top 90%',
      end: 'top 75%',
      markers: false,
    },
  })

  gsap.to(button_txt, {
    opacity: 1,
    yPercent: -100,
    duration: 0.8,
    ease: 'power1.out',
    scrollTrigger: {
      trigger: button_txt,
      start: 'top 90%',
      end: 'top 75%',
      markers: false,
    },
  })

  gsap.to(features_p, {
    opacity: 1,
    yPercent: -100,
    duration: 0.8,
    ease: 'power1.out',
    scrollTrigger: {
      trigger: features_p,
      start: 'top 90%',
      end: 'top 75%',
      markers: false,
    },
  })

  gsap.to(price_p, {
    opacity: 1,
    yPercent: -100,
    duration: 0.8,
    ease: 'power1.out',
    scrollTrigger: {
      trigger: price_p,
      start: 'top 90%',
      end: 'top 75%',
      markers: false,
    },
  })

  price_desc.forEach((desc) => {
    const splitDesc = new SplitType(desc, { types: 'lines' })

    splitDesc.lines.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      wrapper.style.display = 'block'
      wrapper.style.height = '1.2em'

      line.parentNode.insertBefore(wrapper, line)
      wrapper.appendChild(line)

      gsap.from(line, {
        opacity: 0,
        yPercent: 100,
        duration: 0.8,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: line,
          start: 'top 80%',
          end: 'top 85%',
          markers: false,
        },
      })
    })
  })
}

export default pricing
