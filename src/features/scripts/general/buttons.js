import { gsap } from 'gsap'
import SplitType from 'split-type'

function buttons() {
  if (
    document.body.classList.contains('body__home') ||
    document.body.classList.contains('body__contact') ||
    document.body.classList.contains('body__aux')
  ) {
    // HERO BUTTON
    const button_wrapper = document.querySelector('.download-h-wrapper')
    const txt = document.querySelector('.download-heading')
    const txt_hidden = txt.nextElementSibling

    const splitTxt = new SplitType(txt, {
      types: 'chars',
    })
    const splitTxtHidden = new SplitType(txt_hidden, {
      types: 'chars',
    })

    const stag = 0.016

    button_wrapper.addEventListener('mouseenter', () => {
      gsap.to(splitTxt.chars, {
        yPercent: -102,
        duration: 0.4,
        ease: 'power1.out',
        stagger: stag,
      })
      gsap.to(splitTxtHidden.chars, {
        yPercent: -100,
        duration: 0.4,
        ease: 'power1.out',
        stagger: stag,
      })
    })
    button_wrapper.addEventListener('mouseleave', () => {
      gsap.to(splitTxt.chars, {
        yPercent: 0,
        duration: 0.4,
        ease: 'power2.out',
        stagger: stag,
      })

      gsap.to(splitTxtHidden.chars, {
        yPercent: 0,
        duration: 0.4,
        ease: 'power2.out',
        stagger: stag,
      })
    })
  }

  if (document.body.classList.contains('body__club')) {
    const button_wrapper = document.querySelectorAll('.butt')

    button_wrapper.forEach((butt) => {
      const o_hidden_cont = butt.firstElementChild
      const txt = o_hidden_cont.firstElementChild
      const txt_hidden = txt.nextElementSibling

      const splitTxt = new SplitType(txt, {
        types: 'chars',
      })
      const splitTxtHidden = new SplitType(txt_hidden, {
        types: 'chars',
      })

      const stag = 0.016
      butt.addEventListener('mouseenter', (event) => {
        const wrapper = event.currentTarget

        gsap.to(wrapper, {
          backgroundColor: '#ceff05',
          duration: 0.4,
        })

        gsap.to(splitTxt.chars, {
          yPercent: -102,
          color: '#0e0e0e',
          duration: 0.4,
          ease: 'power1.out',
          stagger: stag,
        })
        gsap.to(splitTxtHidden.chars, {
          yPercent: -100,
          color: '#0e0e0e',
          duration: 0.4,
          ease: 'power1.out',
          stagger: stag,
        })
      })
      butt.addEventListener('mouseleave', (event) => {
        const wrapper = event.currentTarget

        gsap.to(wrapper, {
          backgroundColor: '#00000021',
          duration: 0.4,
        })

        gsap.to(splitTxt.chars, {
          yPercent: 0,
          color: '#cbcbcd',
          duration: 0.4,
          ease: 'power2.out',
          stagger: stag,
        })

        gsap.to(splitTxtHidden.chars, {
          yPercent: 0,
          color: '#cbcbcd',
          duration: 0.4,
          ease: 'power2.out',
          stagger: stag,
        })
      })
    })
  }
}

export default buttons
