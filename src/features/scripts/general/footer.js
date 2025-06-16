import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function footer() {
  const headings = document.querySelectorAll('.footer-col-h')
  const ps = document.querySelectorAll('.footer-col-p')
  const mention = document.querySelectorAll('.footer-mention-p')
  const logo_h = document.querySelector('.padmi-logo-h')
  const icons = document.querySelectorAll('.footer-socials')
  const icon_link = document.querySelectorAll('.footer-social-link')
  const footer_link_wrappers = document.querySelectorAll('.is--footer-p')
  const illy_link = document.querySelector('.is--illy')

  headings.forEach((h) => {
    gsap.to(h, {
      yPercent: -100,
      scrollTrigger: {
        trigger: h,
        start: 'top 90%',
        end: 'top 60%',
      },
    })
  })

  ps.forEach((p) => {
    gsap.to(p, {
      yPercent: -100,
      scrollTrigger: {
        trigger: p,
        start: 'top 90%',
        end: 'top 60%',
      },
    })
  })

  gsap.from(icons, {
    opacity: 0,
    duration: 0.8,
    ease: 'power1.inOut',
  })

  gsap.to(mention, {
    yPercent: -100,
    scrollTrigger: {
      trigger: mention,
      start: 'top 90%',
      end: 'top 60%',
    },
  })

  gsap.to(logo_h, {
    yPercent: -100,
    scrollTrigger: {
      trigger: logo_h,
      start: 'top 90%',
      end: 'top 60%',
    },
  })

  icon_link.forEach((link) => {
    link.addEventListener('mouseover', (e) => {
      const i = e.currentTarget
      gsap.to(i, {
        scale: 0.9,
        duration: 0.3,
        ease: 'power1.out',
      })
    })
    link.addEventListener('mouseleave', (e) => {
      const i = e.currentTarget
      gsap.to(i, {
        scale: 1,
        duration: 0.3,
        ease: 'power1.out',
      })
    })
  })

  footer_link_wrappers.forEach((w) => {
    w.addEventListener('mouseover', (e) => {
      const i = e.currentTarget
      gsap.to(i, {
        opacity: 0.65,
        x: 4,
        duration: 0.2,
        ease: 'none',
      })
    })
    w.addEventListener('mouseleave', (e) => {
      const i = e.currentTarget
      gsap.to(i, {
        opacity: 1,
        x: 0,
        duration: 0.2,
        ease: 'none',
      })
    })
  })

  illy_link.addEventListener('mouseover', (e) => {
    const i = e.currentTarget.firstElementChild
    console.log(i)
    gsap.to(i, {
      opacity: 0.9,
      color: '#ceff05',
      duration: 0.2,
      ease: 'none',
    })
  })
  illy_link.addEventListener('mouseleave', (e) => {
    const i = e.currentTarget.firstElementChild
    gsap.to(i, {
      opacity: 1,
      color: '#e7e1e5',
      duration: 0.2,
      ease: 'none',
    })
  })
}

export default footer
