import gsap from 'gsap'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

function map() {
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
  // const clubs_wrapper = document.querySelector('.clubs-wrapper')
  const clubs_list = document.querySelectorAll('.clubs-list')
  const elementsArray = Array.from(clubs_list)
  const clubs_h = document.querySelector('.clubs-h')
  const club_p = document.querySelectorAll('.club-p')
  const club_p_Array = Array.from(club_p)
  // courts list
  const courts_card = document.querySelector('.courts-card')
  const courts_h = document.querySelector('.pistas-h')
  // const court_name = document.querySelector('.court-h')
  const courts_wrapper = document.querySelector('.courts-wrapper')

  const hover_duration = 0.6

  let clubCardsDummy = false
  gsap.set(clubs_card, {
    pointerEvents: 'none',
  })

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
  let margins = 36
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
          if (countIndex == 12) {
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

  // let isGeneratingClub = false
  // function generateClubName(target) {
  //   if (isGeneratingClub) return
  //   isGeneratingClub = true
  //   const targetText = target
  //   const targetChars = targetText.split('')

  //   const time = 5

  //   let names = new Array(targetChars.length).fill(' ')
  //   names[0] = targetChars[0]

  //   let index = 1

  //   const interval = setInterval(() => {
  //     if (index < targetChars.length) {
  //       if (names[index] !== targetChars[index]) {
  //         randomChar()
  //         names[index] = countChar
  //         if (isUpperCase(targetChars[index])) {
  //           names[index] = targetChars[index]
  //         }
  //       } else {
  //         countIndex = 0
  //         index++ // Move to the next character only when correct
  //       }

  //       court_name.textContent = names.join('')
  //       // console.log(names.join(''))
  //     } else {
  //       clearInterval(interval)
  //       clubs_wrapper.style.pointerEvents = 'auto'
  //       isGeneratingClub = false
  //       // console.log('Match found:', names.join(''))
  //     }
  //   }, time)
  // }

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
    clubs_h.textContent = `Clubs en ${cities[currentIndex - 1].name}`
    // handleClub(cities[currentIndex - 1].firstClubIndex) // aquí estoy metiendo FCI de cada club: .....firstClubIndex
    // reiniciar caja pistas
    courts_wrapper.innerHTML = ''
    // court_name.textContent = `Selecciona un club`
    courts_h.textContent = `Pistas Padmi: `
  }

  function handleClub(index) {
    // name
    // let currentClub = clubs[index].name
    // generateClubName(currentClub)

    // courts
    courts_wrapper.innerHTML = ''
    // const courtNumbers = clubs[index].courts.split(' ')
    // console.log(clubs[index].courts)
    //prettier-ignore
    const courtNumbers = [...clubs[index].courts.matchAll(/[·](.*?)[·]/g)].map(match => match[1])
    // console.log(courtNumbers)
    courtNumbers.forEach((court) => {
      // console.log(court)
      const courtContainer = document.createElement('div')
      courtContainer.classList.add('court-container')
      const courtName = document.createElement('h6')
      courtName.classList.add('court-name')
      courtName.textContent = `Pista ${court}`
      courtContainer.appendChild(courtName)
      courts_wrapper.appendChild(courtContainer)
    })
    courts_h.textContent = `Pistas Padmi: ${clubs[index].courtNumber}`
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
      // console.log(clubCardsDummy)
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
      gsap.to(club_p, {
        color: '#e5e7e1',
        duration: 0.4,
      })
      gsap.to(clubs_card, {
        backgroundColor: '#8b81e422',
        duration: hover_duration - 0.25,
        ease: 'power1.inOut',
        onComplete: () => {
          gsap.to(clubs_card, {
            backgroundColor: '#8b81e400',
            duration: hover_duration - 0.25,
            ease: 'power1.inOut',
          })
        },
      })
      if (!clubCardsDummy) {
        gsap.set(clubs_card, {
          pointerEvents: 'auto',
          onComplete: () => {
            clubs_card.style.pointerEvents = 'auto'
            clubCardsDummy = true
          },
        })
      }
      // handleCity()
      handleCity()
      updateLegend()
    })
    name.addEventListener('mouseover', (event) => {
      const n = event.currentTarget
      gsap.to(n, {
        x: 8,
        duration: 0.3,
      })
    })
    name.addEventListener('mouseleave', (event) => {
      const n = event.currentTarget
      gsap.to(n, {
        x: 0,
        duration: 0.3,
      })
      gsap.to(cityDotsArray[index], {
        x: 0,
        duration: 0.3,
      })
    })
  })

  // clubs
  club_p.forEach((club, index) => {
    club.addEventListener('click', (event) => {
      // clubs_wrapper.style.pointerEvents = 'none'
      const n = event.currentTarget
      // console.log(index)
      gsap.to(club_p, {
        color: '#e5e7e133',
        duration: 0.4,
      })
      gsap.to(n, {
        color: '#e5e7e1',
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
  // boxes
  clubs_card.addEventListener('mouseover', (event) => {
    const card = event.currentTarget
    gsap.to(card, {
      backgroundColor: '#8b81e410',
      duration: hover_duration - 0.2,
    })
  })
  clubs_card.addEventListener('mouseleave', (event) => {
    const card = event.currentTarget
    gsap.to(card, {
      backgroundColor: '#ffffff00',
      duration: hover_duration,
    })
  })
  courts_card.addEventListener('mouseover', (event) => {
    const card = event.currentTarget
    gsap.to(card, {
      backgroundColor: '#8b81e410',
      duration: hover_duration - 0.2,
    })
  })
  courts_card.addEventListener('mouseleave', (event) => {
    const card = event.currentTarget
    gsap.to(card, {
      backgroundColor: '#ffffff00',
      duration: hover_duration,
    })
  })
  // MOBILE CHECK

  function isMobile() {
    return window.innerWidth <= 568
  }
  // console.log(isMobile())

  // CONSTANTS
  const map_wrapper = document.querySelector('.map')
  const map_navigator = document.querySelector('.map-main-nav')
  const cities = []
  const clubs = []
  const markers = []
  // let clicks = []

  // MAP RENDERING INIT

  const map = new maplibregl.Map({
    container: 'map',
    style: `https://api.maptiler.com/maps/5af093ac-6e4a-49cb-b247-bd629a603481/style.json?key=OFwEOATP6EiKKl7TcWZ6`,
    center: [-15, 32],
    zoom: 1.2,
    attributionControl: false,
  })

  // FETCH DATA

  async function fetchDataCities() {
    //prettier-ignore
    const url = 'https://docs.google.com/spreadsheets/d/1vrx1C923eENudXx2PKNoUil72SChqlNxk3bscbVd2Y8/gviz/tq?tqx=out:csv'
    try {
      const response = await fetch(url)
      const data = await response.text()

      const rows = data.split('\n').slice(1) // Remove header
      rows.forEach((row, index) => {
        const columns = row.split(',')

        if (columns.length < 3) {
          console.warn(`Skipping row ${index + 1}: Not enough columns`)
          return
        }

        let lat
        let lng
        let name = columns[0]?.trim().replace(/"/g, '')
        let stringLng = columns[1]?.trim().replace(',', '.').replace(/"/g, '')
        let stringLat = columns[2]?.trim().replace(',', '.').replace(/"/g, '')
        let club = columns[3]?.trim().replace(/"/g, '')
        let court = columns[4]?.trim().replace(/"/g, '')
        let frst_clb_index = columns[5]?.trim().replace(/"/g, '')

        if (!stringLng || !stringLat) {
          console.log('Longitude or Latitude is empty or invalid')
        } else {
          lng = parseFloat(stringLng)
          lat = parseFloat(stringLat)
          club = parseFloat(club)
          court = parseFloat(court)
          frst_clb_index = parseFloat(frst_clb_index)
        }

        if (isNaN(lat) || isNaN(lng)) {
          //prettier-ignore
          console.warn(`Skipping row ${index + 1}: Invalid lat/lng values`, { name, lng, lat })
          return
        }

        cities.push({
          name,
          lat,
          lng,
          clubs: club,
          courts: court,
          firstClubIndex: frst_clb_index,
        })
        // console.log(cities)
      })
    } catch (error) {
      console.error('Error loading Google Sheets data:', error)
    }
  }

  async function fetchDataClubs() {
    //prettier-ignore
    const url = 'https://docs.google.com/spreadsheets/d/1Eq_-QFHJpyr5npeI2u5Vc2WVQ8eE5qdbPndKra6FfzM/gviz/tq?tqx=out:csv'
    try {
      const response = await fetch(url)
      const data = await response.text()

      const rows = data.split('\n').slice(1) // Remove header
      rows.forEach((row) => {
        const columns = row.split(',')

        let clb_lat
        let clb_lng
        let clb_name = columns[0]?.trim().replace(/"/g, '')
        let stringLng = columns[1]?.trim().replace(',', '.').replace(/"/g, '')
        let stringLat = columns[2]?.trim().replace(',', '.').replace(/"/g, '')
        let clb_crts = columns[3]?.trim().replace(/"/g, '')
        let clb_crt_number = columns[4]?.trim().replace(/"/g, '')

        clb_lng = parseFloat(stringLng)
        clb_lat = parseFloat(stringLat)

        clubs.push({
          name: clb_name,
          lat: clb_lat,
          lng: clb_lng,
          courts: clb_crts,
          courtNumber: clb_crt_number,
        })
      })
    } catch (error) {
      console.error('Error loading Google Sheets data:', error)
    }
    console.log(clubs)
  }

  // LOAD MARKERS

  function loadMarkers() {
    clubs.forEach((club, i) => {
      let latitude = clubs[i].lat
      let longitude = clubs[i].lng
      const marker = new maplibregl.Marker({
        element: createCustomImageMarker(),
        anchor: 'bottom',
      })
        .setLngLat([longitude, latitude])
        .setPopup(
          new maplibregl.Popup({ className: 'popup', offset: [0, -80] }) // Add custom class
            .setHTML(`<div class="popup-content">${clubs[i].name}</div>`)
        )
        .addTo(map)
      markers.push(marker)

      map.on('zoom', () => {
        const zoom = map.getZoom()
        // markers.forEach((marker) => {
        //   const popup = marker.getPopup()
        //   // Set opacity of the popup based on zoom level
        //   if (zoom < 13) {
        //     popup.getElement().style.opacity = '0' // Hide popup
        //   } else {
        //     popup.getElement().style.opacity = '1' // Show popup
        //   }
        // })
        document.querySelectorAll('.custom-marker').forEach((marker) => {
          const size = Math.max(10, zoom * 1.6) // Adjust scaling formula
          marker.style.width = `${size * 1.1}px`
          marker.style.height = `${size * 2.5}px` // Keep proportions
        })
      })
      // Function to create an image marker
      function createCustomImageMarker() {
        const marker = document.createElement('div')
        marker.className = 'custom-marker'
        //prettier-ignore
        marker.style.backgroundImage = 'url(https://raw.githubusercontent.com/illysito/padmi/85951f28c6a93b36ae3d6a20a083dd7519412f92/location-icon-3.png)'
        marker.style.width = '11px'
        marker.style.height = '25px'
        marker.style.backgroundSize = 'cover'
        // marker.style.width = '0.8em'
        // marker.style.height = '0.8em'
        // marker.style.borderRadius = '0.8em'
        // marker.style.backgroundColor = '#ceff05'

        marker.addEventListener('click', (event) => {
          // Animate the map zooming out to the marker's coordinates
          map.flyTo({
            center: [longitude, latitude], // Set the center to the marker's location
            zoom: 17,
            speed: 3,
            curve: 1,
            easing: (t) => {
              return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
            },
          })
          const markersNodeList = document.querySelectorAll('.custom-marker')
          const markersArray = Array.from(markersNodeList)
          const currentMarker = event.currentTarget
          const markersArrayIndex = markersArray.indexOf(currentMarker)
          gsap.to(club_p, {
            color: '#e5e7e133',
            duration: 0.4,
          })
          gsap.to(club_p_Array[markersArrayIndex + 1], {
            color: '#e5e7e1',
            duration: 0.4,
          })
          handleClub(markersArrayIndex)
        })
        return marker
      }
    })
  }

  // ASYNC INITIALIZATION

  async function init() {
    await fetchDataCities()
    await fetchDataClubs()
    // map_nav(cities, clubs)
    loadMarkers()
  }

  // FLY

  function flyToCity(index) {
    if (isMobile()) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
    markers.forEach((marker) => {
      marker.getPopup().remove()
    })
    map.flyTo({
      center: [cities[index].lng, cities[index].lat],
      zoom: 9,
      speed: 2,
      curve: 1,
      easing: (t) => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      },
    })
    // if (markers[cities[index].firstClubIndex]) {
    //   markers[cities[index].firstClubIndex].togglePopup()
    // }
  }

  function flyToClub(index) {
    if (isMobile()) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
    markers.forEach((marker) => {
      marker.getPopup().remove()
    })
    map.flyTo({
      center: [clubs[index].lng, clubs[index].lat],
      zoom: 17,
      speed: 3,
      curve: 1,
      easing: (t) => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      },
    })
    if (markers[index]) {
      markers[index].togglePopup()
    }
  }

  // FADE IN

  gsap.to([map_wrapper, map_navigator], {
    opacity: 1,
    scale: 1,
    duration: 1.8,
    ease: 'power2.inOut',
  })

  init()

  // EVENT LISTENING

  // const city_names = document.querySelectorAll('.city-header')
  const club_names = document.querySelectorAll('.club-p')

  map_wrapper.addEventListener('mouseenter', () => {
    document.body.classList.add('stop-scrolling')
  })

  map_wrapper.addEventListener('mouseleave', () => {
    document.body.classList.remove('stop-scrolling')
  })

  city_names.forEach((name, index) => {
    //prettier-ignore
    name.addEventListener('click', () => {
      flyToCity(index)
    })
  })

  club_names.forEach((name, index) => {
    name.addEventListener('click', () => flyToClub(index - 1))
  })
}

export default map
