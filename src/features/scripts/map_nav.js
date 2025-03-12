import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger)

function map_nav() {
  const city_card = document.querySelectorAll('.city-card')
  // const map_h_wrapper = document.querySelectorAll('.map-h-wrapper')
  // const map_h = document.querySelectorAll('.map-h')
  let sH
  let eH
  // DETECTO LA MEDIDA INICIAL DE LA TARJETA COLAPSADA
  city_card.forEach((c) => {
    if (c.classList.contains('is--collapsed')) {
      return (sH = c.scrollHeight)
    }
  })

  function handleCard(event) {
    const card = event.currentTarget
    const wrapper = card.firstElementChild
    const title = wrapper.firstElementChild
    console.log(title)
    const img = wrapper.nextElementSibling
    //prettier-ignore
    const elementsToToggle = wrapper.querySelectorAll('.map-coords, .map-p')

    const isCollapsed = card.classList.contains('is--collapsed')

    if (isCollapsed) {
      // EXPANDING
      //prettier-ignore
      // const toCollapse = document.querySelectorAll('.city-card, .map-h, .map-coords, .map-p, .map-img')
      // toCollapse.forEach((el) => el.classList.add('is--collapsed'))
      console.log(sH)

      card.classList.remove('is--collapsed') // Make content visible
      img.classList.remove('is--collapsed')
      elementsToToggle.forEach((el) => el.classList.remove('is--collapsed'))
      elementsToToggle.forEach((el) => (el.style.opacity = 0))
      img.style.opacity = 0
      title.style.opacity = 0

      const endHeight = card.scrollHeight // Get new height
      console.log(card.scrollHeight)
      eH = endHeight

      // Reset height and animate

      card.style.height = `${sH}px`
      elementsToToggle.forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        })
      })
      gsap.to(title, {
        opacity: 1,
        fontSize: '1.6em',
        fontWeight: 600,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      })
      gsap.to(img, {
        opacity: 1,
        // scale: 1,
        duration: 1,
        ease: 'power2.out',
      })
      gsap.to(card, {
        paddingTop: 20,
        paddingBottom: 30,
        height: eH,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => {
          card.style.height = 'auto' // Reset to auto after animation
        },
      })
      console.log(eH)
      console.log(card.scrollHeight)
    } else {
      // COLLAPSING

      // const startHeight = card.offsetHeight
      // Lock height before collapse
      console.log(sH)
      card.style.height = `${eH}px`
      elementsToToggle.forEach((el) => {
        gsap.to(el, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        })
      })
      gsap.to(card, {
        paddingTop: 12,
        paddingBottom: 10,
        height: sH,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => {
          card.style.height = '' // Reset after animation
          card.classList.add('is--collapsed') // Hide content
          img.classList.add('is--collapsed')
          elementsToToggle.forEach((el) => el.classList.add('is--collapsed'))
        },
      })
      gsap.to(title, {
        opacity: 1,
        fontSize: '1em',
        fontWeight: 300,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
      })
      gsap.to(img, {
        opacity: 0,
        // scale: 0.8,
        duration: 0.8,
        ease: 'power2.out',
      })

      // const endHeight = card.offsetHeight // New height after collapse

      // Animate to collapsed height
    }
  }

  city_card.forEach((w) => {
    w.addEventListener('click', handleCard)
  })
}

export default map_nav
