import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger)

function map_nav(clubs, courts) {
  const card = document.querySelector('.sity-card')
  const city_cards = document.querySelectorAll('.sity-card-element')
  const city_cards_array = Array.from(city_cards)
  const city_dots = document.querySelectorAll('.sity-dot')
  const city_dots_array = Array.from(city_dots)
  const city_names = document.querySelectorAll('.sity-h')
  const legend = document.querySelector('.legend-card')
  const hover_duration = 0.6
  const club_h = document.querySelector('.is--club')
  const court_h = document.querySelector('.is--court')
  // const map_h = document.querySelectorAll('.map-h')
  // const map_coords = document.querySelectorAll('.map-coords')
  // const map_p = document.querySelectorAll('.map-p')
  // const map_imgs = document.querySelectorAll('.map-img')
  gsap.to(legend, {
    opacity: 1,
    duration: 1.2,
  })

  let heights = []
  let currentIndex
  let margins = 36
  // INIZIALIZO EL ARRAY DE TAMAÑOS
  city_cards.forEach((c, index) => {
    heights[index] = c.scrollHeight + margins
  })

  function handleCity() {
    gsap.to(city_cards, {
      opacity: 0,
      duration: 0.2,
    })
    gsap.to(city_cards_array[currentIndex], {
      opacity: 1,
      duration: 0.6,
    })
    gsap.to(card, {
      height: heights[currentIndex],
      duration: 0.8,
    })
  }
  function updateLegend() {
    let current_i = parseInt(club_h.textContent) || 0
    let target_i = clubs[currentIndex - 1]
    let current_j = parseInt(court_h.textContent) || 0
    let target_j = courts[currentIndex - 1]
    let step_i = current_i < target_i ? 1 : -1
    let step_j = current_j < target_j ? 1 : -1

    if (current_i === target_i && current_j === target_j) return

    for (let i = current_i; i !== target_i + step_i; i += step_i) {
      setTimeout(() => {
        club_h.textContent = i
      }, Math.abs(i - current_i) * 80)
    }
    for (let j = current_j; j !== target_j + step_j; j += step_j) {
      setTimeout(() => {
        court_h.textContent = j
      }, Math.abs(j - current_j) * 80)
    }
    // i = clubs[currentIndex - 1]
  }

  // EVENT LISTENERS

  // CLICK
  city_names.forEach((name, index) => {
    name.addEventListener('click', (event) => {
      const n = event.currentTarget
      currentIndex = index + 1
      gsap.to(city_names, {
        color: '#e5e7e1',
        duration: 0.4,
      })
      gsap.to(n, {
        color: '#ceff05',
        duration: 0.4,
      })
      gsap.to(city_dots, {
        backgroundColor: '#e5e7e1',
        x: 0,
        duration: 0.4,
      })
      gsap.to(city_dots_array[index], {
        backgroundColor: '#ceff05',
        x: 20,
        duration: 0.4,
      })
      handleCity()
      updateLegend()
    })
    name.addEventListener('mouseover', (event) => {
      const n = event.currentTarget
      gsap.to(n, {
        x: 20,
        duration: 0.4,
      })
      gsap.to(city_dots_array[index], {
        x: 20,
        duration: 0.4,
      })
    })
    name.addEventListener('mouseleave', (event) => {
      const n = event.currentTarget
      gsap.to(n, {
        x: 0,
        duration: 0.4,
      })
      gsap.to(city_dots_array[index], {
        x: 0,
        duration: 0.4,
      })
    })
  })

  // HOVER
  card.addEventListener('mouseover', (event) => {
    const card = event.currentTarget
    gsap.to(card, {
      backgroundColor: '#8b81e444',
      duration: hover_duration - 0.2,
    })
  })
  card.addEventListener('mouseleave', (event) => {
    const card = event.currentTarget
    gsap.to(card, {
      backgroundColor: '#ffffff00',
      duration: hover_duration,
    })
  })
  legend.addEventListener('mouseover', () => {
    gsap.to(legend, {
      backgroundColor: '#8b81e412',
      duration: hover_duration - 0.2,
    })
  })
  legend.addEventListener('mouseleave', () => {
    gsap.to(legend, {
      backgroundColor: '#ffffff00',
      duration: hover_duration,
    })
  })
}

export default map_nav
