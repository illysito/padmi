import { World } from './World.js'

function world(container, index) {
  const trigger = document.querySelector('.claim')
  let hasClaimBeenObserved = false
  let lastScrollY = window.scrollY

  function isDesktopOrTablet() {
    return window.innerWidth >= 768
  }

  if (isDesktopOrTablet()) {
    const world = new World(container, index)
    const hamburger = document.querySelector('.ham-button')
    const back_button = document.querySelector('.back-wrapper')

    world.start()

    // STOP LOOP WHEN MENU IS CLICKED
    if (index == 0 || index == 1) {
      hamburger.addEventListener('click', () => {
        setTimeout(() => world.stop(), 600)
      })
      back_button.addEventListener('click', () => {
        setTimeout(() => world.start(), 800)
      })
    }

    // STOP LOOP WHEN UNOBSERVED (INTERSECTION OBSERVER METHOD)
    if (index == 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (!hasClaimBeenObserved) {
                world.stop()
                hasClaimBeenObserved = true
              }
            } else {
              if (window.scrollY < lastScrollY) {
                world.start()
                hasClaimBeenObserved = false
              }
            }
          })
        },
        { threshold: 0.25 }
      )

      observer.observe(trigger)

      window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY
      })
    }
  }
}

export default world
