import { World } from './World.js' // cambiar la ruta si fuera necesario

function world(container, index) {
  const trigger = document.querySelector('.claim')
  let hasClaimBeenObserved = false // Track if claim has been observed
  let lastScrollY = window.scrollY // Track the last scroll position

  function isDesktopOrTablet() {
    //prettier-ignore
    return window.innerWidth >= 768
  }
  // 1. Create an instance of the World app
  if (isDesktopOrTablet()) {
    const world = new World(container, index)
    const hamburger = document.querySelector('.ham-button')
    const back_button = document.querySelector('.back-wrapper')
    // 2. Render the scene
    world.start()
    if (index == 0) {
      // STOP LOOP WHEN MENU IS CLICKED
      hamburger.addEventListener('click', () => {
        setTimeout(() => world.stop(), 600)
      })
      back_button.addEventListener('click', () => {
        setTimeout(() => world.start(), 800)
      })

      // STOP LOOP WHEN UNOBSERVED (INTERSECTION OBSERVER METHOD)
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (!hasClaimBeenObserved) {
                world.stop() // Stop the loop when claim is observed
                hasClaimBeenObserved = true
              }
            } else {
              if (window.scrollY < lastScrollY) {
                // Scrolled upwards, resume the loop
                world.start() // Start the loop again when scrolling up
                hasClaimBeenObserved = false // Reset the flag
              }
            }
          })
        },
        { threshold: 0.25 } // Adjust threshold for sensitivity
      )

      observer.observe(trigger)

      window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY
      })
    }
  }
}

export default world
