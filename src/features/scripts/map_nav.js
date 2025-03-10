import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger)

function map_nav() {
  const map_h_wrapper = document.querySelectorAll('.map-h-wrapper')
  const map_h = document.querySelectorAll('.map-h')

  function move(event) {
    const wrapper = event.currentTarget
    const current_h = wrapper.firstElementChild
    gsap.to(map_h, {
      color: '#e5e7e1',
      fontWeight: 400,
      duration: 1.2,
    })
    gsap.to(map_h_wrapper, {
      y: -100,
      duration: 0.6,
    })
    gsap.to(current_h, {
      color: '#ceff05',
      fontWeight: 'bold',
      duration: 1.2,
    })
  }

  map_h_wrapper.forEach((w) => {
    w.addEventListener('click', move)
  })
}

export default map_nav
