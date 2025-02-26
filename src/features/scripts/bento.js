import { gsap } from 'gsap'

function bento() {
  const boxes = document.querySelectorAll('.bento_box')

  function hoverIn(event) {
    const box = event.currentTarget
    const text_wrapper = box.firstElementChild
    const shiny_text = text_wrapper.firstElementChild
    const aux = text_wrapper.nextElementSibling
    const illustration = aux.nextElementSibling
    const beam = illustration.nextElementSibling
    gsap.to(shiny_text, {
      opacity: 0.8,
      duration: 0.2,
    })
    gsap.to(illustration, {
      scale: 1.05,
      duration: 0.6,
      ease: 'power2.out',
    })
    gsap.to(beam, {
      width: '80%',
      duration: 1,
      ease: 'power2.inOut',
    })
    gsap.to(box, {
      scale: 0.99,
      borderRadius: '16px',
      duration: 0.4,
    })
  }

  function hoverOut(event) {
    const box = event.currentTarget
    const text_wrapper = box.firstElementChild
    const shiny_text = text_wrapper.firstElementChild
    const aux = text_wrapper.nextElementSibling
    const illustration = aux.nextElementSibling
    const beam = illustration.nextElementSibling
    gsap.to(shiny_text, {
      opacity: 0.0,
      duration: 0.2,
    })
    gsap.to(illustration, {
      scale: 1.0,
      duration: 0.6,
      ease: 'power2.out',
    })
    gsap.to(beam, {
      width: '0%',
      duration: 1,
      ease: 'power2.inOut',
    })
    gsap.to(box, {
      scale: 1,
      borderRadius: '8px',
      duration: 0.4,
    })
  }

  boxes.forEach((box) => {
    box.addEventListener('mouseenter', hoverIn)
    box.addEventListener('mouseleave', hoverOut)
  })
}

export default bento
