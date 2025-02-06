import { gsap } from 'gsap'

function buttons() {
  const buttons = document.querySelectorAll('.button')

  function hoverIn(event) {
    const but = event.currentTarget
    // const but_ovly = but.firstElementChild
    const but_text = but.lastElementChild

    gsap.to(but, {
      scale: 0.95,
      duration: 0.3,
      backgroundColor: '#8b81e4',
    })

    // gsap.to(but_ovly, {
    //   yPercent: 100,
    //   duration: 0.4,
    //   ease: 'power3.inOut',
    // })

    gsap.to(but_text, {
      color: '#e5e7e1',
      duration: 0.1,
      ease: 'power2.inOut',
    })
  }

  function hoverOut(event) {
    const but = event.currentTarget
    // const but_ovly = but.firstElementChild
    const but_text = but.lastElementChild

    gsap.to(but, {
      scale: 1.0,
      duration: 0.3,
      backgroundColor: '#ceff05',
    })

    // gsap.to(but_ovly, {
    //   yPercent: 0,
    //   duration: 0.4,
    //   ease: 'power3.inOut',
    // })

    gsap.to(but_text, {
      color: '#0a0b0b',
      duration: 0.1,
      ease: 'power2.inOut',
    })
  }

  buttons.forEach((button) => {
    button.addEventListener('mouseover', hoverIn)
    button.addEventListener('mouseleave', hoverOut)
  })
}

export default buttons
