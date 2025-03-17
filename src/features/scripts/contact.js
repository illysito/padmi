import { gsap } from 'gsap'
import SplitType from 'split-type'

function contact() {
  const cards = document.querySelectorAll('.social-card')
  const cards_long = document.querySelectorAll('.social-card-longer')
  const send = document.querySelector('.submit-button')
  const nav = document.querySelector('.nav-container')
  const socials = document.querySelector('.socials-wrapper')
  const form = document.querySelector('.contact-form-wrapper')
  const heading = document.querySelector('.contact-heading')
  const contact_line = document.querySelector('.contact-p')
  const icon = document.querySelector('.send-icon')

  const hover_duration = 0.4

  gsap.to([nav, socials, form, contact_line, heading], {
    opacity: 1,
    duration: 1.5,
    ease: 'power2.inOut',
  })

  gsap.to(icon, {
    rotation: 360,
    duration: 10,
    ease: 'linear',
    repeat: -1,
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
      })
    })
    card.addEventListener('mouseleave', (event) => {
      const card = event.currentTarget
      gsap.to(card, {
        backgroundColor: '#ffffff00',
        duration: hover_duration,
        borderRadius: 32,
      })
    })
  })
  cards_long.forEach((card) => {
    card.addEventListener('mouseover', (event) => {
      const card = event.currentTarget
      gsap.to(card, {
        backgroundColor: '#8b81e444',
        duration: hover_duration,
        borderRadius: 16,
      })
    })
    card.addEventListener('mouseleave', (event) => {
      const card = event.currentTarget
      gsap.to(card, {
        backgroundColor: '#ffffff00',
        duration: hover_duration,
        borderRadius: 32,
      })
    })
  })
  send.addEventListener('mouseover', () => {
    gsap.to(send, {
      scale: 0.94,
      borderRadius: 48,
      duration: hover_duration - 0.1,
    })
    gsap.to(icon, {
      y: -12,
      duration: 0.6,
    })
  })
  send.addEventListener('mouseleave', () => {
    gsap.to(send, {
      scale: 1,
      borderRadius: 32,
      duration: hover_duration - 0.1,
    })
    gsap.to(icon, {
      y: 0,
      duration: 0.6,
    })
  })
}

export default contact
