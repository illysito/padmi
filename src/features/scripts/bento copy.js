import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function bento() {
  function isDesktop() {
    //prettier-ignore
    return window.innerWidth >= 991
  }
  const boxes = document.querySelectorAll('.bento_box')
  const boxesArray = Array.from(boxes)
  const bentoOverlay = document.querySelector('.bento-overlay')

  let isClicked = false
  let isHoverActive = false
  let rotation = 0
  let left = 0
  let top = 0

  function setInitialState() {
    gsap.from(boxes, {
      opacity: 0,
      rotationZ: 0,
      duration: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: boxes,
        start: 'top 90%',
        // end: 'top 20%',
      },
      onComplete: () => {
        isHoverActive = true
      },
    })
  }
  setInitialState()

  function hoverIn(event, cardIndex) {
    if (!isHoverActive) return
    if (isClicked) return
    const box = event.currentTarget
    boxesArray.forEach((box, index) => {
      if (index !== cardIndex) {
        gsap.to(box, {
          filter: 'saturate(0%)',
          duration: 0.6,
        })
      }
    })
    gsap.to(box, {
      opacity: 1,
      scale: 0.99,
      y: -60,
      borderRadius: '16px',
      duration: 0.6,
    })
  }

  function hoverOut(event) {
    if (!isHoverActive) return
    // if (isClicked) return
    const box = event.currentTarget
    gsap.to(boxes, {
      filter: 'saturate(80%)',
      duration: 0.6,
    })
    gsap.to(box, {
      scale: 1,
      y: 0,
      borderRadius: '8px',
      duration: 0.6,
    })
  }

  function clickIn(event) {
    const box = event.currentTarget
    const textContainer = box.lastElementChild
    console.log(rotation)
    console.log(isClicked)
    if (!isClicked) {
      rotation = gsap.getProperty(box, 'rotationZ')
      left = gsap.getProperty(box, 'left')
      top = gsap.getProperty(box, 'top')
      gsap.to(box, {
        y: 0,
        width: '30%',
        height: '70svh',
        left: '35%',
        top: '-8svh',
        borderRadius: '8px',
        scale: 1,
        rotationZ: 0,
        zIndex: 2,
        duration: 0.6,
        ease: 'power1.out',
      })
      gsap.to(bentoOverlay, {
        zIndex: 1,
        opacity: 1,
      })
      gsap.to(textContainer, {
        yPercent: -100,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        ease: 'power1.out',
      })
      isClicked = true
    } else {
      if (gsap.getProperty(box, 'zIndex') === 2) {
        gsap.to(textContainer, {
          yPercent: 0,
          opacity: 0,
          duration: 0.8,
        })
        gsap.to(box, {
          width: '16%',
          height: '40svh',
          left: left,
          top: top,
          rotationZ: rotation,
          zIndex: 0,
          duration: 0.6,
          delay: 0.1,
          ease: 'power1.out',
          onComplete: () => {
            gsap.set(box, {
              clearProps: 'width,height,left,top,rotation,zIndex',
            })
          },
        })
        gsap.to(bentoOverlay, {
          zIndex: 0,
          opacity: 0,
        })
        isClicked = false
      }
    }
  }

  if (isDesktop()) {
    boxes.forEach((box, index) => {
      box.addEventListener('mouseenter', (event) => hoverIn(event, index))
      box.addEventListener('mouseleave', hoverOut)
      box.addEventListener('click', clickIn)
    })
  }
}

export default bento
