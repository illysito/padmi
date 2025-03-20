import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger)

function map_nav(cities, clubs) {
  // main card
  const card = document.querySelector('.card')
  const heading = document.querySelector('.city-heading')
  const low_line = document.querySelector('.low-line')
  const coords = document.querySelector('.city-coords')
  const city_data_wrapper = document.querySelector('.city-data-wrapper')
  const club_h = document.querySelector('.is--club')
  const court_h = document.querySelector('.is--court')
  const city_imgs = document.querySelectorAll('.city-img')
  const world_img = document.querySelector('.is--world')
  const cityImgsArray = Array.from(city_imgs)
  // city names
  const city_names_wrapper = document.querySelector('.city-names-wrapper')
  const city_dots = document.querySelectorAll('.city-point')
  const cityDotsArray = Array.from(city_dots)
  const city_names = document.querySelectorAll('.city-header')
  // clubs list
  const clubs_card = document.querySelector('.clubs-card')
  const clubs_wrapper = document.querySelector('.clubs-wrapper')
  const clubs_list = document.querySelectorAll('.clubs-list')
  const elementsArray = Array.from(clubs_list)
  const clubs_h = document.querySelector('.clubs-h')
  const club_p = document.querySelectorAll('.club-p')
  // courts list
  const courts_card = document.querySelector('.courts-card')
  const court_name = document.querySelector('.court-h')
  const courts_wrapper = document.querySelector('.courts-wrapper')

  const hover_duration = 0.6

  gsap.to([city_data_wrapper, clubs_card, courts_card], {
    opacity: 1,
    duration: 1,
  })

  gsap.to(world_img, {
    rotation: 360,
    duration: 24,
    repeat: -1,
    ease: 'linear',
  })

  gsap.to(low_line, {
    opacity: 0,
    repeat: -1,
    yoyo: true, // Automatically reverses animation
    repeatDelay: hover_duration / 1.5,
    duration: 0.2, // Adjust as needed
  })

  let heights = []
  let currentIndex
  let margins = 32
  let info_offset = clubs_h.scrollHeight

  // INIZIALIZO EL ARRAY DE TAMAÑOS
  clubs_list.forEach((c, index) => {
    heights[index] = c.scrollHeight + margins + info_offset
  })

  let countIndex = 0
  let countChar = ''
  function randomChar() {
    //prettier-ignore
    const chars = 'abcdefghijklmnopqrstuvwxyzáéíóú'
    countChar = chars[countIndex]
    countIndex = (countIndex + 1) % 62
  }

  function isUpperCase(letter) {
    return letter === letter.toUpperCase()
  }

  let isGeneratingCity = false
  function generateCityName(target) {
    if (isGeneratingCity) return
    isGeneratingCity = true
    const targetText = target
    const targetChars = targetText.split('')

    const time = 20

    let names = new Array(targetChars.length).fill(' ')
    names[0] = targetChars[0]

    let index = 1

    const interval = setInterval(() => {
      if (index < targetChars.length) {
        if (names[index] !== targetChars[index]) {
          randomChar()
          names[index] = countChar
          if (isUpperCase(targetChars[index])) {
            names[index] = targetChars[index]
          }
        } else {
          countIndex = 0
          index++ // Move to the next character only when correct
        }

        heading.textContent = names.join('')

        // console.log(names.join(''))
      } else {
        clearInterval(interval)
        city_names_wrapper.style.pointerEvents = 'auto'
        isGeneratingCity = false
        // console.log('Match found:', names.join(''))
      }
    }, time)
  }

  let isGeneratingClub = false
  function generateClubName(target) {
    if (isGeneratingClub) return
    isGeneratingClub = true
    const targetText = target
    const targetChars = targetText.split('')

    const time = 5

    let names = new Array(targetChars.length).fill(' ')
    names[0] = targetChars[0]

    let index = 1

    const interval = setInterval(() => {
      if (index < targetChars.length) {
        if (names[index] !== targetChars[index]) {
          randomChar()
          names[index] = countChar
          if (isUpperCase(targetChars[index])) {
            names[index] = targetChars[index]
          }
        } else {
          countIndex = 0
          index++ // Move to the next character only when correct
        }

        court_name.textContent = names.join('')
        // console.log(names.join(''))
      } else {
        clearInterval(interval)
        clubs_wrapper.style.pointerEvents = 'auto'
        isGeneratingClub = false
        // console.log('Match found:', names.join(''))
      }
    }, time)
  }

  function handleCity() {
    // OPACITIES & HEIGHT
    gsap.to(clubs_list, {
      opacity: 0,
      duration: 0.2,
      //prettier-ignore
      zIndex: 0,
    })
    gsap.to(elementsArray[currentIndex], {
      opacity: 1,
      duration: 0.6,
      //prettier-ignore
      zIndex: 10,
    })
    gsap.to(city_imgs, {
      opacity: 0,
      duration: 0.2,
      //prettier-ignore
      zIndex: 0,
    })
    gsap.to(cityImgsArray[currentIndex], {
      opacity: 1,
      duration: 0.6,
      //prettier-ignore
      zIndex: 10,
    })
    gsap.to(clubs_card, {
      height: heights[currentIndex],
      duration: 0.8,
    })

    // CONTENT
    let currentCity = cities[currentIndex - 1].name
    generateCityName(currentCity)
    let currentLat = cities[currentIndex - 1].lat.toFixed(2)
    let currentLong = cities[currentIndex - 1].lng.toFixed(2)
    coords.textContent = `${currentLat}º N ${currentLong}º W`
    handleClub(cities[currentIndex - 1].firstClubIndex) // aquí estoy metiendo FCI de cada club: .....firstClubIndex
  }

  function handleClub(index) {
    // name
    let currentClub = clubs[index].name
    generateClubName(currentClub)

    // courts
    courts_wrapper.innerHTML = ''
    // const courtNumbers = clubs[index].courts.split(' ')
    // console.log(clubs[index].courts)
    //prettier-ignore
    const courtNumbers = [...clubs[index].courts.matchAll(/[·](.*?)[·]/g)].map(match => match[1])
    console.log(courtNumbers)
    courtNumbers.forEach((court) => {
      console.log(court)
      const courtContainer = document.createElement('div')
      courtContainer.classList.add('court-container')
      const courtName = document.createElement('h6')
      courtName.classList.add('court-name')
      courtName.textContent = `${court}`
      courtContainer.appendChild(courtName)
      courts_wrapper.appendChild(courtContainer)
    })
  }

  function updateLegend() {
    let current_i = parseInt(club_h.textContent) || 0
    let target_i = cities[currentIndex - 1].clubs
    let current_j = parseInt(court_h.textContent) || 0
    let target_j = cities[currentIndex - 1].courts
    let step_i = current_i < target_i ? 1 : -1
    let step_j = current_j < target_j ? 1 : -1

    if (current_i === target_i && current_j === target_j) return

    for (let i = current_i; i !== target_i + step_i; i += step_i) {
      setTimeout(() => {
        club_h.textContent = i
      }, Math.abs(i - current_i) * 70)
    }
    if (current_j > 30) current_j = 30
    for (let j = current_j; j !== target_j + step_j; j += step_j) {
      setTimeout(() => {
        court_h.textContent = j
      }, Math.abs(j - current_j) * 60)
    }
    // i = clubs[currentIndex - 1]
  }

  //  ------------------------ CLICK & HOVER  ------------------------

  // cities
  city_names.forEach((name, index) => {
    name.addEventListener('click', (event) => {
      city_names_wrapper.style.pointerEvents = 'none'
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
      gsap.to(cityDotsArray[index], {
        backgroundColor: '#ceff05',
        duration: 0.4,
      })
      // handleCity()
      handleCity()
      updateLegend()
    })
    name.addEventListener('mouseover', (event) => {
      const n = event.currentTarget
      gsap.to(n, {
        x: 12,
        duration: 0.4,
      })
    })
    name.addEventListener('mouseleave', (event) => {
      const n = event.currentTarget
      gsap.to(n, {
        x: 0,
        duration: 0.4,
      })
      gsap.to(cityDotsArray[index], {
        x: 0,
        duration: 0.4,
      })
    })
  })

  // clubs
  club_p.forEach((club, index) => {
    club.addEventListener('click', (event) => {
      clubs_wrapper.style.pointerEvents = 'none'
      const n = event.currentTarget
      console.log(index)
      gsap.to(club_p, {
        color: '#e5e7e1',
        duration: 0.4,
      })
      gsap.to(n, {
        color: '#ceff05',
        duration: 0.4,
      })
      handleClub(index - 1) // aquí index - 1 porque hay un primer elemento dummy: - (guion solo)
    })
    club.addEventListener('mouseover', (event) => {
      const n = event.currentTarget
      gsap.to(n, {
        x: 8,
        duration: 0.4,
      })
    })
    club.addEventListener('mouseleave', (event) => {
      const n = event.currentTarget
      gsap.to(n, {
        x: 0,
        duration: 0.4,
      })
    })
  })

  // ------------------------ HOVER  ------------------------

  // card
  card.addEventListener('mouseover', (event) => {
    const card = event.currentTarget
    gsap.to(card, {
      backgroundColor: '#8b81e410',
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

  // legend
  city_data_wrapper.addEventListener('mouseover', () => {
    gsap.to(city_data_wrapper, {
      backgroundColor: '#8b81e412',
      duration: hover_duration - 0.2,
    })
  })
  city_data_wrapper.addEventListener('mouseleave', () => {
    gsap.to(city_data_wrapper, {
      backgroundColor: '#ffffff00',
      duration: hover_duration,
    })
  })
}

export default map_nav
