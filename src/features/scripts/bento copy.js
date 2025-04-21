import { gsap } from 'gsap'

function bento() {
  function isDesktop() {
    //prettier-ignore
    return window.innerWidth >= 991
  }
  const boxes = document.querySelectorAll('.bento_box')
  const boxesArray = Array.from(boxes)
  const bentoOverlay = document.querySelector('.bento-overlay')

  let isClicked = false
  let rotation = 0
  let left = 0
  let top = 0

  // function setInitialState() {
  //   gsap.from(boxes, {
  //     left: '42%',
  //     top: '-8svh',
  //     rotationZ: 0,
  //     duration: 1,
  //     scrollTrigger: {
  //       trigger: boxes,
  //       start: 'top 40%',
  //       // end: 'top 20%',
  //     },
  //   })
  // }
  // setInitialState()

  function hoverIn(event, cardIndex) {
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
    // if (isClicked) return
    const box = event.currentTarget
    gsap.to(boxes, {
      filter: 'saturate(100%)',
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
        rotationZ: 0,
        zIndex: 2,
        duration: 0.5,
      })
      gsap.to(bentoOverlay, {
        zIndex: 1,
        opacity: 1,
      })
      isClicked = true
    } else {
      if (gsap.getProperty(box, 'zIndex') === 2) {
        gsap.to(box, {
          width: '16%',
          height: '40svh',
          left: left,
          top: top,
          rotationZ: rotation,
          zIndex: 0,
          duration: 0.5,
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
