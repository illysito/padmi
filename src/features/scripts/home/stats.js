import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function stats() {
  function isDesktop() {
    //prettier-ignore
    return window.innerWidth >= 991
  }
  const stats_section = document.querySelector('.stats')
  const boxes = document.querySelectorAll('.stats_box')
  const title = document.querySelector('.stats-title')
  const titlesArray = [
    '·',
    '% de errores y winners de cada golpe',
    'Total de golpes',
    'Velocidad de la bola',
    'Mapa de calor',
    'VS Jugadores',
    'Metros recorridos',
    'Análisis de servicio',
    'Pad ID',
  ]
  const boxesArray = Array.from(boxes)
  const blurOverlay = document.querySelector('.blur-overlay')
  const line = document.querySelector('.stats-line')
  const dot = document.querySelector('.stats-dot')

  let isClicked = false
  let isHoverActive = false
  let rotation = 0
  let left = 0
  let top = 0

  // functions
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
        // pin: true,
      },
      onComplete: () => {
        isHoverActive = true
      },
    })
    gsap.to(title, {
      yPercent: 100,
      oapcity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: title,
        start: 'top 80%',
      },
    })
  }

  const targetX = line.getBoundingClientRect().width
  // const dotWidth = dot.getBoundingClientRect().width
  function pinSection() {
    gsap.to(dot, {
      // x: targetX - dotWidth,
      width: targetX,
      scrollTrigger: {
        start: 'top top',
        end: 'bottom top',
        pin: stats_section,
        markers: false,
        scrub: true,
      },
    })
  }

  // function calls
  setInitialState()
  pinSection()

  // events
  function handleTitles(i) {
    title.textContent = titlesArray[i + 1]
  }

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
    handleTitles(cardIndex)
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
    if (!isClicked) handleTitles(-1)
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
        top: '-15svh',
        borderRadius: '8px',
        scale: 1,
        rotationZ: 0,
        zIndex: 2,
        duration: 0.6,
        ease: 'power1.out',
      })
      gsap.to(blurOverlay, {
        zIndex: 1,
        opacity: 1,
        duration: 0.6,
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
        gsap.to(blurOverlay, {
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

export default stats
