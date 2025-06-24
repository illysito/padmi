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
    hamburger.addEventListener('click', () => {
      setTimeout(() => world.stop(), 800)
    })
    back_button.addEventListener('click', () => {
      setTimeout(() => world.start(), 700)
    })

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
        let stopScroll = 6500
        // stopScroll = 6000
        if (lastScrollY > stopScroll && !hasClaimBeenObserved) {
          world.stop()
          hasClaimBeenObserved = true
        } else if (lastScrollY < stopScroll && hasClaimBeenObserved) {
          world.start()
          hasClaimBeenObserved = false
        }
      })
    } else if (index == 4) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              world.start()
              hasClaimBeenObserved = true
            } else {
              world.stop()
              hasClaimBeenObserved = false
            }
          })
        },
        { threshold: 0.1 }
      )

      observer.observe(container)

      window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY
      })
    }
  }
}

export default world
