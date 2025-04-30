import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function mouse() {
  const blob_wrapper = document.querySelector('.mouse-blob')
  const blob = document.querySelector('.mouse')
  const blob_overlay = document.querySelector('.mouse-overlay')
  // const hero = document.querySelector('.hero__section')

  let targetX = 0
  let targetY = 0
  let currentX = 0
  let currentY = 0

  const lerpFactor = 0.25

  gsap.to(blob_overlay, {
    opacity: 1,
    duration: 0.3,
  })

  gsap.to(blob, {
    opacity: 1.5,
    // scrollTrigger: {
    //   trigger: hero,
    //   start: 'bottom 100%',
    //   end: 'bottom 98%',
    //   scrub: 1,
    //   markers: false,
    // },
  })

  function update() {
    // Lerp the current position towards the target position
    currentX = gsap.utils.interpolate(currentX, targetX, lerpFactor)
    currentY = gsap.utils.interpolate(currentY, targetY, lerpFactor)

    // Apply the updated position using CSS transform
    blob_wrapper.style.transform = `translate(-50%, -50%) translate(${currentX}px, ${currentY}px)`

    requestAnimationFrame(update)
  }

  document.addEventListener('mousemove', (event) => {
    targetX = event.clientX
    targetY = event.pageY
  })

  update()
}

export default mouse
