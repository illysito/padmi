import gsap from 'gsap'

function menu() {
  const logo_link = document.querySelector('.logo-link')
  const logo = logo_link.firstElementChild
  const green = document.querySelector('.is--green')
  const menu_screen = document.querySelector('.menu-bg')
  const menu_header = document.querySelectorAll('.menu-heading')
  const menu_link = document.querySelectorAll('.menu-link')
  const burger = document.querySelector('.ham-button')
  const back_wrapper = document.querySelector('.back-wrapper')
  const os = document.querySelector('.os-links')
  const os_links = document.querySelectorAll('.os-heading')

  const ease = 'power1.out'

  logo_link.addEventListener('mouseover', () => {
    gsap.to(logo, {
      scale: 0,
      duration: 0.5,
      ease: ease,
    })
    gsap.to(green, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: ease,
    })
  })
  logo_link.addEventListener('mouseleave', () => {
    gsap.to(logo, {
      scale: 1,
      duration: 0.5,
      ease: ease,
    })
    gsap.to(green, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: ease,
    })
  })

  // MENU SCREEN

  let width = burger.clientWidth
  let direction = 1

  function restoreBurger() {
    burger.style.pointerEvents = 'none'
    menu_screen.style.pointerEvents = 'none'
    gsap.to(burger, {
      width: width,
      duration: 1.2,
      ease: 'power3.inOut',
    })
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
    gsap.to(os, {
      opacity: 0,
      y: '50%',
      duration: 0.4,
    })
  }

  if (burger) {
    burger.addEventListener('click', (event) => {
      if (!burger.classList.contains('clicked')) {
        burger.classList.add('clicked') // Keep rotation state
      }
      const ham = event.currentTarget
      const ham_up = ham.firstElementChild
      const ham_down = ham.lastElementChild

      burger.style.pointerEvents = 'none'
      menu_screen.style.pointerEvents = 'none'
      gsap.to(burger, {
        width: 0,
        duration: 1.2,
        ease: 'power2.out',
      })
      gsap.to(menu_screen, {
        delay: 0.1,
        yPercent: 130,
        duration: 1.4,
        ease: 'power2.inOut',
      })
      gsap.to(menu_header, {
        // delay: 0.6,
        yPercent: -100,
        duration: 1.6,
        ease: 'power1.inOut',
        stagger: 0.05,
        onComplete: () => {
          burger.classList.remove('clicked')
          burger.style.pointerEvents = 'auto'
          menu_screen.style.pointerEvents = 'auto'
          gsap.to(ham_up, {
            rotate: 0,
            duration: 0.6,
            // ease: 'power2.out',
          })
          gsap.to(ham_down, {
            rotate: 0,
            duration: 0.6,
            // ease: 'power2.out',
          })
        },
      })
    })
    burger.addEventListener('mouseover', (event) => {
      const ham = event.currentTarget
      const ham_up = ham.firstElementChild
      const ham_down = ham.lastElementChild
      gsap.to(ham_up, {
        rotate: 180,
        duration: 0.6,
        // ease: 'power2.out',
      })
      gsap.to(ham_down, {
        rotate: -180,
        duration: 0.6,
        // ease: 'power2.out',
      })
    })
    burger.addEventListener('mouseleave', (event) => {
      if (burger.classList.contains('clicked')) return
      const ham = event.currentTarget
      const ham_up = ham.firstElementChild
      const ham_down = ham.lastElementChild
      gsap.to(ham_up, {
        rotate: 0,
        duration: 0.6,
        // ease: 'power2.out',
      })
      gsap.to(ham_down, {
        rotate: 0,
        duration: 0.6,
        // ease: 'power2.out',
      })
    })

    menu_link.forEach((link, index) => {
      link.addEventListener('click', (event) => {
        const l = event.currentTarget
        const h = l.firstElementChild
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
        gsap.to(os, {
          opacity: 0,
          y: '50%',
          duration: 0.4,
        })
        gsap.to(h, {
          x: 0,
          duration: 0.4,
        })
        restoreBurger()
      })
      link.addEventListener('mouseover', (event) => {
        const l = event.currentTarget
        const h = l.firstElementChild
        if (h.classList.contains('download')) {
          direction = -1
        } else {
          direction = 1
        }
        gsap.to(h, {
          x: 24 * direction,
          duration: 0.4,
        })
        if (index == 4) {
          gsap.to(os, {
            opacity: 1,
            y: 0,
            duration: 0.4,
          })
        }
      })
      link.addEventListener('mouseleave', (event) => {
        const l = event.currentTarget
        const h = l.firstElementChild
        gsap.to(h, {
          x: 0,
          duration: 0.4,
        })
      })
    })
    os_links.forEach((heading) => {
      heading.addEventListener('click', () => {
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
        gsap.to(heading, {
          yPercent: '50%',
          duration: 0.4,
          opacity: 0,
        })
      })
      heading.addEventListener('mouseover', (event) => {
        const h = event.currentTarget
        gsap.to(h, {
          x: 10,
          duration: 0.4,
        })
      })
      heading.addEventListener('mouseleave', (event) => {
        const h = event.currentTarget
        gsap.to(h, {
          x: 0,
          duration: 0.4,
        })
      })
    })

    back_wrapper.addEventListener('click', restoreBurger)
    back_wrapper.addEventListener('mouseover', (event) => {
      const l = event.currentTarget
      gsap.to(l, {
        x: 12,
        duration: 0.4,
      })
    })
    back_wrapper.addEventListener('mouseleave', (event) => {
      const l = event.currentTarget
      gsap.to(l, {
        x: 0,
        duration: 0.4,
      })
    })
  }
}

export default menu
