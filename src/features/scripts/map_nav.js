import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger)

function map_nav() {
  const city_card = document.querySelectorAll('.city-card')
  // const map_h = document.querySelectorAll('.map-h')
  // const map_coords = document.querySelectorAll('.map-coords')
  // const map_p = document.querySelectorAll('.map-p')
  // const map_imgs = document.querySelectorAll('.map-img')
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
    card.style.pointerEvents = 'none'
    const wrapper = card.firstElementChild
    const title = wrapper.firstElementChild
    console.log(title)
    const img = wrapper.nextElementSibling
    //prettier-ignore
    const elementsToToggle = wrapper.querySelectorAll('.map-coords, .map-p')

    const isCollapsed = card.classList.contains('is--collapsed')

    // function collapseAll() {
    //   //prettier-ignore
    //   // const toCollapse = document.querySelectorAll('.city-card, .map-h, .map-coords, .map-p, .map-img')
    //   // toCollapse.forEach((el) => el.classList.add('is--collapsed'))
    //   city_card.forEach((c) => {
    //     c.style.height = `${eH}px`
    //   })
    //   gsap.to(map_h, {
    //     opacity: 1,
    //     fontSize: '1em',
    //     fontWeight: 300,
    //     scale: 1,
    //     duration: 0.8,
    //     ease: 'power2.out',
    //   })
    //   gsap.to(city_card, {
    //     paddingTop: 12,
    //     paddingBottom: 10,
    //     height: sH,
    //     duration: 0.8,
    //     ease: 'power2.out',
    //     onComplete: () => {
    //       city_card.forEach((c) => {
    //         c.style.pointerEvents = 'auto' // Reset after animation
    //         c.classList.add('is--collapsed') // Hide content
    //         c.style.height = ''
    //       })
    //       map_imgs.forEach((img) => {
    //         img.classList.add('is--collapsed')
    //       })
    //       map_coords.forEach((coord) => {
    //         coord.classList.add('is--collapsed')
    //       })
    //       map_p.forEach((p) => {
    //         p.classList.add('is--collapsed')
    //       })
    //     },
    //   })
    //   gsap.to(img, {
    //     opacity: 0,
    //     scale: 0.8,
    //     duration: 0.8,
    //     ease: 'power2.out',
    //   })
    // }

    function expand() {
      //prettier-ignore
      // collapseAll()
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
        scale: 1,
        duration: 1,
        ease: 'power2.out',
      })
      gsap.to(card, {
        paddingTop: 16,
        // paddingBottom: 20,
        height: eH,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => {
          card.style.pointerEvents = 'auto' // Reset to auto after animation
        },
      })
      console.log(eH)
      console.log(card.scrollHeight)
    }

    function collapse() {
      console.log(sH)
      card.style.height = `${eH}px`
      elementsToToggle.forEach((el) => {
        gsap.to(el, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        })
      })
      gsap.to(title, {
        opacity: 1,
        fontSize: '1em',
        fontWeight: 300,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
      })
      gsap.to(card, {
        paddingTop: 12,
        paddingBottom: 10,
        height: sH,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => {
          card.style.pointerEvents = 'auto' // Reset after animation
          card.classList.add('is--collapsed') // Hide content
          img.classList.add('is--collapsed')
          elementsToToggle.forEach((el) => el.classList.add('is--collapsed'))
          card.style.height = ''
        },
      })
      gsap.to(img, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: 'power2.out',
      })

      // const endHeight = card.offsetHeight // New height after collapse

      // Animate to collapsed height
    }

    if (isCollapsed) {
      expand()
    } else {
      collapse()
    }
  }

  city_card.forEach((w) => {
    w.addEventListener('click', handleCard)
  })
}

export default map_nav
