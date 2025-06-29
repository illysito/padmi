import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

function tech() {
  // ELEMENTS
  const tech_h = document.querySelectorAll('.tech-h')
  const tech_txt = document.querySelectorAll('.tech-txt')
  const tech_title = document.querySelectorAll('.tech-title')
  const download_txt = document.querySelector('.download-cta')
  const starfield_container = document.querySelector('.starfield-container')
  const download_link = document.querySelector('.download-link-wrapper')
  const download_link_pc = document.querySelector('.download-link-wrapper-pc')

  gsap.to(starfield_container, {
    opacity: 1,
    ease: 'power1.out',
    scrollTrigger: {
      trigger: starfield_container,
      start: 'top 75%',
      end: 'top 25%',
      markers: false,
      scrub: true,
    },
  })

  gsap.to(tech_h, {
    opacity: 1,
    yPercent: -100,
    duration: 0.8,
    ease: 'power1.out',
    scrollTrigger: {
      trigger: tech_h,
      start: 'top 90%',
      end: 'top 75%',
      markers: false,
    },
  })

  gsap.to(tech_title, {
    opacity: 1,
    yPercent: -100,
    duration: 0.8,
    ease: 'power1.out',
    scrollTrigger: {
      trigger: tech_title,
      start: 'top 90%',
      end: 'top 75%',
      markers: false,
    },
  })

  gsap.to(
    [
      download_txt,
      download_link.firstElementChild,
      download_link_pc.firstElementChild,
    ],
    {
      opacity: 1,
      yPercent: -100,
      duration: 0.8,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: download_txt,
        start: 'top 90%',
        end: 'top 75%',
        markers: false,
      },
    }
  )

  tech_txt.forEach((desc) => {
    const splitDesc = new SplitType(desc, { types: 'lines' })

    splitDesc.lines.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      wrapper.style.display = 'block'
      wrapper.style.height = '1.4em'

      line.parentNode.insertBefore(wrapper, line)
      wrapper.appendChild(line)

      gsap.from(line, {
        opacity: 0,
        yPercent: 100,
        duration: 0.8,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: line,
          start: 'top 85%',
          end: 'top 45%',
          markers: false,
        },
      })
    })
  })

  download_link.addEventListener('mouseover', (e) => {
    const j = e.currentTarget.firstElementChild
    const i = j.firstElementChild
    console.log(i)
    gsap.to(i, {
      opacity: 0.9,
      color: '#8b81e4',
      duration: 0.2,
      ease: 'none',
    })
  })
  download_link.addEventListener('mouseleave', (e) => {
    const j = e.currentTarget.firstElementChild
    const i = j.firstElementChild
    gsap.to(i, {
      opacity: 1,
      color: '#ceff05',
      duration: 0.2,
      ease: 'none',
    })
  })
}

export default tech
