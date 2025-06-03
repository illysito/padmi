import { World } from './World.js'

function world(container, index) {
  const trigger = document.querySelector('.claim')
  let hasClaimBeenObserved = false
  let lastScrollY = window.scrollY

  function isDesktopOrTablet() {
    // return window.innerWidth >= 768
    return true
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
        { threshold: 0.5 }
      )

      observer.observe(trigger)

      window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY
      })
    } else if (index == 1) {
      window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY
        let stopScroll = 7000
        // stopScroll = 6000
        if (lastScrollY > stopScroll && !hasClaimBeenObserved) {
          world.stop()
          hasClaimBeenObserved = true
        } else if (lastScrollY < stopScroll && hasClaimBeenObserved) {
          world.start()
          hasClaimBeenObserved = false
        }
      })
    }
  }
}

export default world
