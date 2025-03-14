import { World } from './World.js' // cambiar la ruta si fuera necesario

function world(container, index) {
  const trigger = document.querySelector('.claim')
  let hasClaimBeenObserved = false // Track if claim has been observed
  let lastScrollY = window.scrollY // Track the last scroll position

  function isDesktop() {
    //prettier-ignore
    return window.innerWidth >= 991
  }
  // 1. Create an instance of the World app
  if (isDesktop()) {
    const world = new World(container, index)
    // 2. Render the scene
    world.start()
    if (index == 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              console.log('ya!')
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
        { threshold: 0.8 } // Adjust threshold for sensitivity
      )

      observer.observe(trigger)

      window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY
      })
    }
  }
}

export default world
