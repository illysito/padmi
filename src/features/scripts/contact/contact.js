import { gsap } from 'gsap'
import SplitType from 'split-type'

function contact() {
  const cards = document.querySelectorAll('.social-card, .social-card-longer')
  const send = document.querySelector('.submit-button')
  const nav = document.querySelector('.nav-container')
  const socials = document.querySelector('.socials-wrapper')
  const form = document.querySelector('.contact-form-wrapper')
  const heading = document.querySelector('.contact-heading')
  const contact_line = document.querySelector('.contact-p')
  const contact_line_2 = document.querySelectorAll('.contact-p-2')
  const icon = document.querySelector('.send-icon')
  const icon_link = document.querySelectorAll('.social-link')

  const hover_duration = 0.4

  gsap.to([nav, socials, form, contact_line, contact_line_2, heading], {
    opacity: 1,
    duration: 1.5,
    ease: 'power2.inOut',
  })

  gsap.to(icon, {
    rotateZ: 360, // Better than rotation
    duration: 10,
    ease: 'linear',
    repeat: -1,
    willChange: 'transform', // Hinting browser for optimization
    force3D: true, // Forces GPU acceleration
    x: 0.1,
  })

  const splitH = new SplitType(heading, { types: 'lines' })
  splitH.lines.forEach((line) => {
    const wrapper = document.createElement('div')
    wrapper.style.overflow = 'hidden'
    wrapper.style.display = 'block'

    line.parentNode.insertBefore(wrapper, line)
    wrapper.appendChild(line)
  })
  gsap.from(splitH.lines, {
    opacity: 1,
    yPercent: 100,
    duration: 1,
    ease: 'power1.out',
    stagger: 0.1,
  })

  // EVENT LISTENERS

  // CLICK

  // HOVER
  cards.forEach((card) => {
    card.addEventListener('mouseover', (event) => {
      const card = event.currentTarget
      gsap.to(card, {
        backgroundColor: '#8b81e444',
        duration: hover_duration,
        borderRadius: 16,
        ease: 'power2.out',
      })
    })
    card.addEventListener('mouseleave', (event) => {
      const card = event.currentTarget
      gsap.to(card, {
        backgroundColor: '#ffffff00',
        duration: hover_duration,
        borderRadius: 32,
        ease: 'power2.out',
      })
    })
  })
  send.addEventListener('mouseover', () => {
    gsap.to(send, {
      scale: 0.94,
      borderRadius: 48,
      duration: hover_duration - 0.1,
      ease: 'power2.out',
    })
    gsap.to(icon, {
      y: -12,
      duration: 0.6,
    })
  })
  send.addEventListener('mouseleave', () => {
    gsap.to(send, {
      scale: 1,
      borderRadius: 16,
      duration: hover_duration - 0.1,
      ease: 'power2.out',
    })
    gsap.to(icon, {
      y: 0,
      duration: 0.6,
    })
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
}

export default contact
