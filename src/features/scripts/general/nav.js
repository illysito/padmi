import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

function nav() {
  // function isDesktopOrTablet() {
  //   //prettier-ignore
  //   return window.innerWidth >= 768
  // }
  // if (isDesktopOrTablet()) {
  // CONST
  const nav_container = document.querySelector('.nav-container')
  const button = document.querySelectorAll('.button')
  const links = document.querySelectorAll('.nav-link')
  // const body = document.body

  // INIT ANIMATION
  gsap.to(nav_container, {
    opacity: 1,
    duration: 1.5,
    ease: 'power2.inOut',
  })
  gsap.to(button, {
    scale: 1,
    opacity: 1,
    duration: 2,
    ease: 'power2.out',
  })

  // HOME ANIMATION
  // if (body.classList.contains('body__home')) {
  //   gsap.to(nav_container, {
  //     backgroundColor: '#e5e7e1',
  //   })
  // }

  // NAV LINKS
  links.forEach((link) => {
    const link_text = link.firstElementChild
    const link_text_hidden = link_text.nextElementSibling
    const splitText = new SplitType(link_text, { types: 'chars' })
    const splitText2 = new SplitType(link_text_hidden, { types: 'chars' })

    const stag = 0.016

    function hoverIn() {
      gsap.to(splitText.chars, {
        yPercent: -100,
        duration: 0.4,
        ease: 'power1.out',
        stagger: stag,
      })

      gsap.to(splitText2.chars, {
        yPercent: -100,
        duration: 0.4,
        ease: 'power1.out',
        stagger: stag,
      })
    }

    function hoverOut() {
      gsap.to(splitText.chars, {
        yPercent: 0,
        duration: 0.4,
        ease: 'power2.out',
        stagger: stag,
      })

      gsap.to(splitText2.chars, {
        yPercent: 0,
        duration: 0.4,
        ease: 'power2.out',
        stagger: stag,
      })
    }
    link.addEventListener('mouseenter', hoverIn)
    link.addEventListener('mouseleave', hoverOut)
  })
  // }
}

export default nav
