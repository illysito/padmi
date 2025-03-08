import gsap from 'gsap'

function menu() {
  const logo_link = document.querySelector('.logo-link')
  const menu_screen = document.querySelector('.menu-bg')
  const menu_header = document.querySelectorAll('.menu-heading')
  const menu_link = document.querySelectorAll('.menu-link')
  const burger = document.querySelector('.ham-button')
  const back_wrapper = document.querySelector('.back-wrapper')

  const ease = 'power1.out'

  logo_link.addEventListener('mouseover', () => {
    gsap.to(logo_link, {
      scale: 0.97,
      duration: 0.5,
      ease: ease,
    })
  })
  logo_link.addEventListener('mouseleave', () => {
    gsap.to(logo_link, {
      scale: 1,
      duration: 0.5,
      ease: ease,
    })
  })

  // MENU SCREEN

  if (burger) {
    burger.addEventListener('click', () => {
      burger.style.pointerEvents = 'none'
      menu_screen.style.pointerEvents = 'none'
      gsap.to(menu_screen, {
        yPercent: 100,
        duration: 1.4,
        ease: 'power2.inOut',
      })
      gsap.to(menu_header, {
        yPercent: -100,
        duration: 1.6,
        ease: 'power1.inOut',
        stagger: 0.05,
        onComplete: () => {
          burger.style.pointerEvents = 'auto'
          menu_screen.style.pointerEvents = 'auto'
        },
      })
    })

    menu_link.forEach((link) => {
      link.addEventListener('click', () => {
        burger.style.pointerEvents = 'none'
        menu_screen.style.pointerEvents = 'none'
        gsap.to(menu_header, {
          yPercent: 100,
          duration: 1.2,
          ease: 'power1.inOut',
          onComplete: () => {
            burger.style.pointerEvents = 'auto'
            menu_screen.style.pointerEvents = 'auto'
          },
        })
        gsap.to(menu_screen, {
          yPercent: 0,
          duration: 1.4,
          ease: 'power2.inOut',
        })
      })
    })

    back_wrapper.addEventListener('click', () => {
      burger.style.pointerEvents = 'none'
      menu_screen.style.pointerEvents = 'none'
      gsap.to(menu_header, {
        yPercent: 100,
        duration: 1.2,
        ease: 'power1.inOut',
        onComplete: () => {
          burger.style.pointerEvents = 'auto'
          menu_screen.style.pointerEvents = 'auto'
        },
      })
      gsap.to(menu_screen, {
        yPercent: 0,
        duration: 1.4,
        ease: 'power2.inOut',
      })
    })
  }
}

export default menu
