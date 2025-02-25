import { gsap } from 'gsap'
import SplitType from 'split-type'

function buttons() {
  const buttons = document.querySelectorAll('.button')

  buttons.forEach((button) => {
    const but_wrapper = button.firstElementChild
    const but_text = but_wrapper.firstElementChild
    const but_text_hidden = but_text.nextElementSibling
    const splitText = new SplitType(but_text, { types: 'chars' })
    const splitText2 = new SplitType(but_text_hidden, { types: 'chars' })

    const stag = 0.016

    function hoverIn() {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.2,
        backgroundColor: '#ffffff00',
      })

      gsap.to(splitText.chars, {
        yPercent: -100,
        color: '#cbcbcd',
        duration: 0.4,
        ease: 'power1.out',
        stagger: stag,
      })

      gsap.to(splitText2.chars, {
        yPercent: -100,
        color: '#cbcbcd',
        duration: 0.4,
        ease: 'power1.out',
        stagger: stag,
      })
    }

    function hoverOut() {
      gsap.to(splitText.chars, {
        yPercent: 0,
        color: '#0a0b0b',
        duration: 0.4,
        ease: 'power2.out',
        stagger: stag,
      })

      gsap.to(splitText2.chars, {
        yPercent: 0,
        color: '#0a0b0b',
        duration: 0.4,
        ease: 'power2.out',
        stagger: stag,
      })

      gsap.to(button, {
        scale: 1.0,
        duration: 0.4,
        backgroundColor: '#ceff05',
        ease: 'power2.in',
      })
    }
    button.addEventListener('mouseenter', hoverIn)
    button.addEventListener('mouseleave', hoverOut)
  })
}

export default buttons
