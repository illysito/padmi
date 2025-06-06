import gsap from 'gsap'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

function map() {
  // Detect touch devices
  let isTouch = false

  window.addEventListener(
    'touchstart',
    () => {
      isTouch = true
    },
    { once: true }
  )

  // DOM queries for MAP NAVIGATION
  function queryDomElements() {
    return {
      // main card
      clubNumber: document.querySelector('.is--club'),
      courtNumber: document.querySelector('.is--court'),
      card: document.querySelector('.card'),
      heading: document.querySelector('.city-heading'),
      low_line: document.querySelector('.low-line'),
      coords: document.querySelector('.city-coords'),
      city_data_wrapper: document.querySelector('.city-data-wrapper'),
      club_h: document.querySelector('.is--club'),
      court_h: document.querySelector('.is--court'),
      city_imgs_container: document.querySelector('.city-imgs'),
      city_imgs: document.querySelectorAll('.city-img'),
      world_img: document.querySelector('.is--world'),
      scroll_div: document.querySelector('.scroll-div'),
      scroll_icon: document.querySelector('.scroll-icon'),
      // city names
      city_names_wrapper: document.querySelector('.city-names-wrapper'),
      city_dots: document.querySelectorAll('.city-point'),
      city_names: document.querySelectorAll('.city-header'),
      // clubs list
      clubs_card: document.querySelector('.clubs-card'),
      // const clubs_wrapper = document.querySelector('.clubs-wrapper')
      clubs_list: document.querySelector('.clubs-list'),
      // clubs_list_2: document.querySelector('.clubs-list-2'),
      clubs_h: document.querySelector('.clubs-h'),
      club_p: document.querySelectorAll('.club-p'),
      // courts list
      courts_card: document.querySelector('.courts-card'),
      courts_h: document.querySelector('.pistas-h'),
      // const court_name = document.querySelector('.court-h')
      courts_wrapper: document.querySelector('.courts-wrapper'),
    }
  }
  const domElements = queryDomElements()

  // needed DOM arrays
  let cityImgsArray = Array.from(domElements.city_imgs)
  let cityDotsArray = Array.from(domElements.city_dots)
  let cityNamesArray = Array.from(domElements.city_names)
  // const elementsArray = Array.from(domElements.clubs_list)
  // let club_p_Array = Array.from(domElements.club_p)
  // console.log(club_p_Array)

  // DOM queries for MAP
  const map_wrapper = document.querySelector('.map')
  const map_navigator = document.querySelector('.map-main-nav')
  // const club_names = document.querySelectorAll('.club-p')

  // logic variables
  const hover_duration = 0.6
  let clubCardsDummy = false
  let margins = 36
  let info_offset = domElements.clubs_h.scrollHeight
  let currentHeight = margins + info_offset
  let currentCityIndex = 0
  // let currentIndex
  // meto en un array los heights iniciales de cada clubs p
  // let info_offset_2 = 0
  // let height_2 = 0
  const indexOffsets = []
  const cities = []
  const clubs = []
  let clubCount = 0
  let courtCount = 0
  const markers = []
  const map = new maplibregl.Map({
    container: 'map',
    style: `https://api.maptiler.com/maps/5af093ac-6e4a-49cb-b247-bd629a603481/style.json?key=OFwEOATP6EiKKl7TcWZ6`,
    center: [-4, 40],
    zoom: 4.2,
    attributionControl: false,
  })

  // initial gsap
  function gsapInit() {
    // impedir click en club cards al principio
    gsap.set(domElements.clubs_card, {
      pointerEvents: 'none',
    })
    // fade in
    //prettier-ignore
    gsap.to([domElements.city_data_wrapper, domElements.clubs_card, domElements.courts_card], {
      opacity: 1,
      duration: 1,
    })
    // world image rotation
    gsap.to(domElements.world_img, {
      rotation: 360,
      duration: 24,
      repeat: -1,
      ease: 'linear',
    })
    // barrabaja efecto
    gsap.to(domElements.low_line, {
      opacity: 0,
      repeat: -1,
      yoyo: true, // Automatically reverses animation
      repeatDelay: hover_duration / 1.5,
      duration: 0.2, // Adjust as needed
    })
    // scroll icon parapadeo
    let count = 0
    const maxRepeats = 11
    gsap.to(domElements.scroll_icon, {
      opacity: 0,
      repeat: maxRepeats - 1, // Since the initial animation counts as 1
      yoyo: true,
      repeatDelay: hover_duration / 1.25,
      duration: 0.6,
      onRepeat: function () {
        count++
        // console.log(count)
        if (count >= maxRepeats) {
          gsap.set(domElements.scroll_icon, { opacity: 0 })
        }
      },
    })
    // map & map navigator fade in
    gsap.to([map_wrapper, map_navigator], {
      opacity: 1,
      scale: 1,
      duration: 1.8,
      ease: 'power2.inOut',
    })
  }
  gsapInit()

  // cities and club numbers
  function loadNumbers() {
    let time = 20
    let clubCounter = 0
    let courtCounter = 0
    // Count clubs and display them
    for (let i = 0; i < cities.length; i++) {
      clubCount += cities[i].clubs
    }
    const cityInterval = setInterval(() => {
      domElements.clubNumber.textContent = clubCounter
      clubCounter++
      if (clubCounter > clubCount) clearInterval(cityInterval)
    }, time)
    // Count courts and display them
    for (let j = 0; j < cities.length; j++) {
      courtCount += cities[j].courts
    }
    const courtInterval = setInterval(() => {
      domElements.courtNumber.textContent = courtCounter
      courtCounter++
      if (courtCounter > courtCount) clearInterval(courtInterval)
    }, time / 2)
  }

  // check if it's mobile
  function isMobile() {
    return window.innerWidth <= 568
  }

  // .............................. FUNCIONES .............................. //

  // ··········· AUXILIARES ·········· //

  // generate randomCharacters
  let countIndex = 0
  let countChar = ''
  function randomChar() {
    //prettier-ignore
    const chars = 'abcdefghijklmnopqrstuvwxyzáéíóú'
    countChar = chars[countIndex]
    countIndex = (countIndex + 1) % 62
  }

  // check is char is Uppercase
  function isUpperCase(letter) {
    return letter === letter.toUpperCase()
  }

  // effect on city name
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

        domElements.heading.textContent = names.join('')

        // console.log(names.join(''))
      } else {
        clearInterval(interval)
        domElements.city_names_wrapper.style.pointerEvents = 'auto'
        isGeneratingCity = false
        // console.log('Match found:', names.join(''))
      }
    }, time)
  }

  // genero INDOOR los Index Offsets
  function generateIndexOffsets() {
    for (let i = 1; i < cities.length; i++) {
      indexOffsets[0] = 0
      indexOffsets[i] = indexOffsets[i - 1] + cities[i - 1].clubs
    }
    // console.log(indexOffsets)
  }

  // ············ UI ············ //

  // visualizar en UI la lista de clubes de cada ciudad
  function displayCities() {
    domElements.scroll_div.innerHTML = ''

    // setting content
    for (let i = 0; i < cities.length; i++) {
      const cityNameContainer = document.createElement('div')
      cityNameContainer.classList.add('city-name')
      const cityPoint = document.createElement('div')
      cityPoint.classList.add('city-point')
      const cityHeader = document.createElement('h4')
      cityHeader.classList.add('city-header')
      cityHeader.textContent = cities[i].name
      cityNameContainer.appendChild(cityPoint)
      cityNameContainer.appendChild(cityHeader)
      domElements.scroll_div.appendChild(cityNameContainer)
    }
    const scrollSpacer = document.createElement('div')
    scrollSpacer.classList.add('scroll-spacer')
    domElements.scroll_div.appendChild(scrollSpacer)

    // resetting the list
    domElements.city_names = document.querySelectorAll('.city-header')
    domElements.city_dots = document.querySelectorAll('.city-point')
    cityNamesArray = Array.from(domElements.city_names)
    cityDotsArray = Array.from(domElements.city_dots)

    // resetting the EVENT LISTENER
    domElements.city_names.forEach((name, index) => {
      name.addEventListener('click', () => {
        currentCityIndex = index
        flyToCity(index)
        domElements.city_names_wrapper.style.pointerEvents = 'none'
        // const n = event.currentTarget
        // currentIndex = index + 1
        // clubs to white
        // momentaneous highlight
        gsap.to(domElements.clubs_card, {
          backgroundColor: '#8b81e422',
          duration: hover_duration - 0.25,
          ease: 'power1.inOut',
          onComplete: () => {
            gsap.to(domElements.clubs_card, {
              backgroundColor: '#8b81e400',
              duration: hover_duration - 0.25,
              ease: 'power1.inOut',
            })
          },
        })
        // activate pointer events on clubs on first city click
        if (!clubCardsDummy) {
          gsap.set(domElements.clubs_card, {
            pointerEvents: 'auto',
            onComplete: () => {
              domElements.clubs_card.style.pointerEvents = 'auto'
              clubCardsDummy = true
            },
          })
        }
        handleCity(index + 1)
        updateCount(index + 1)
      })
      name.addEventListener('mouseover', (event) => {
        if (isTouch) return
        const n = event.currentTarget
        gsap.to(n, {
          x: 8,
          duration: 0.3,
        })
      })
      name.addEventListener('mouseleave', (event) => {
        if (isTouch) return
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
  }

  // visualizar imagenes de cada ciudad
  function displayImages() {
    // setting content
    for (let i = 0; i < cities.length; i++) {
      const cityImg = document.createElement('img')
      cityImg.classList.add('city-img', 'is--hidden')

      const URL = cities[i].imgURL
      // console.log(URL)
      const match = URL.match(/\/d\/([^/]+)/)
      const id = match ? match[1] : null
      const SRC = 'https://drive.google.com/thumbnail?id=' + id + '&sz=s800'
      // console.log(SRC)

      cityImg.src = SRC

      domElements.city_imgs_container.appendChild(cityImg)
    }

    // reset node & array
    domElements.city_imgs = document.querySelectorAll('.city-img')
    cityImgsArray = Array.from(domElements.city_imgs)
  }

  // visualizar en UI la lista de clubes de cada ciudad
  function displayClubs(index) {
    domElements.clubs_list.innerHTML = ''

    // turning the ·alsfh· string into an array
    const clubNames = [...cities[index].clubNames.matchAll(/[·](.*?)[·]/g)].map(
      (match) => match[1]
    )

    // setting content
    clubNames.forEach((club) => {
      const clubContainer = document.createElement('div')
      clubContainer.classList.add('club-names-wrapper')
      const clubTitle = document.createElement('p')
      clubTitle.classList.add('club-p')
      clubTitle.textContent = `${club}`
      clubContainer.appendChild(clubTitle)
      domElements.clubs_list.appendChild(clubContainer)
    })

    // setting the height
    currentHeight =
      document.querySelector('.clubs-wrapper').scrollHeight +
      margins +
      info_offset

    // resetting the list
    domElements.club_p = document.querySelectorAll('.club-p')
    // club_p_Array = Array.from(domElements.club_p)

    // resetting the EVENT LISTENER
    domElements.club_p.forEach((club, index) => {
      club.addEventListener('click', (event) => {
        flyToClub(index + indexOffsets[currentCityIndex])
        // clubs_wrapper.style.pointerEvents = 'none'
        const n = event.currentTarget
        // console.log(index)
        gsap.to(domElements.club_p, {
          opacity: 0.4,
          duration: 0.4,
        })
        gsap.to(n, {
          opacity: 1,
          duration: 0.4,
        })
        handleClub(index + indexOffsets[currentCityIndex])
      })
      club.addEventListener('mouseover', (event) => {
        if (isTouch) return
        const n = event.currentTarget
        gsap.to(n, {
          x: 8,
          duration: 0.4,
        })
      })
      club.addEventListener('mouseleave', (event) => {
        if (isTouch) return
        const n = event.currentTarget
        gsap.to(n, {
          x: 0,
          duration: 0.4,
        })
      })
    })
  }

  // update club & courts counter on main card
  function updateCount(index) {
    let current_i = parseInt(domElements.club_h.textContent) || 0
    let target_i = cities[index - 1].clubs
    let current_j = parseInt(domElements.court_h.textContent) || 0
    let target_j = cities[index - 1].courts
    let step_i = current_i < target_i ? 1 : -1
    let step_j = current_j < target_j ? 1 : -1

    if (current_i === target_i && current_j === target_j) return

    for (let i = current_i; i !== target_i + step_i; i += step_i) {
      setTimeout(() => {
        domElements.club_h.textContent = i
      }, Math.abs(i - current_i) * 70)
    }
    if (current_j > 30) current_j = 30
    for (let j = current_j; j !== target_j + step_j; j += step_j) {
      setTimeout(() => {
        domElements.court_h.textContent = j
      }, Math.abs(j - current_j) * 60)
    }
    // i = clubs[currentIndex - 1]
  }

  // ·········· IMPORTANTES ··········· //

  // handle city on click
  function handleCity(index) {
    displayClubs(index - 1)

    function animation() {
      // hide all images
      gsap.to(domElements.city_imgs, {
        opacity: 0,
        duration: 0.2,
        //prettier-ignore
        zIndex: 0,
      })
      // show current image
      gsap.to(cityImgsArray[index], {
        opacity: 1,
        duration: 0.6,
        //prettier-ignore
        zIndex: 10,
      })
      // set correct height to club card
      gsap.to(domElements.clubs_card, {
        height: currentHeight,
        duration: 0.8,
      })
      // city dots to white
      gsap.to(domElements.city_dots, {
        backgroundColor: '#e5e7e1',
        x: 0,
        duration: 0.4,
      })
      // current dot to green
      gsap.to(cityDotsArray[index - 1], {
        backgroundColor: '#ceff05',
        duration: 0.4,
      })
      // city names to white
      gsap.to(domElements.city_names, {
        color: '#e5e7e1',
        duration: 0.4,
      })
      // current City to green
      gsap.to(cityNamesArray[index - 1], {
        color: '#ceff05',
        duration: 0.4,
      })
    }
    animation()

    let currentCity = cities[index - 1].name
    generateCityName(currentCity)

    let currentLat = cities[index - 1].lat.toFixed(2)
    let currentLong = cities[index - 1].lng.toFixed(2)

    domElements.coords.textContent = `${currentLat}º N ${currentLong}º W`
    domElements.clubs_h.textContent = `Clubs en ${cities[index - 1].name}`
    domElements.courts_wrapper.innerHTML = ''
    domElements.courts_h.textContent = `Pistas Padmi: `
  }

  // handle club on click
  function handleClub(index) {
    // Cada vez que hago click en un club, se recompone el HTML que muestra las PISTAS de ese CLUB
    domElements.courts_wrapper.innerHTML = ''
    const courtNumbers = [...clubs[index].courts.matchAll(/[·](.*?)[·]/g)].map(
      (match) => match[1]
    )
    courtNumbers.forEach((court) => {
      const courtContainer = document.createElement('div')
      courtContainer.classList.add('court-container')
      const courtName = document.createElement('h6')
      courtName.classList.add('court-name')
      courtName.textContent = `Pista ${court}`
      courtContainer.appendChild(courtName)
      domElements.courts_wrapper.appendChild(courtContainer)
    })
    domElements.courts_h.textContent = `Pistas Padmi: ${clubs[index].courtNumber}`
  }

  // fetch cities data
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
        let clubNumber = columns[3]?.trim().replace(/"/g, '')
        let court = columns[4]?.trim().replace(/"/g, '')
        let clbName = columns[5]?.trim().replace(/"/g, '')
        let imgURL = columns[6]?.trim().replace(/"/g, '')
        // let frst_clb_index = columns[5]?.trim().replace(/"/g, '')

        if (!stringLng || !stringLat) {
          console.log('Longitude or Latitude is empty or invalid')
        } else {
          lng = parseFloat(stringLng)
          lat = parseFloat(stringLat)
          clubNumber = parseFloat(clubNumber)
          court = parseFloat(court)
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
          clubs: clubNumber,
          courts: court,
          clubNames: clbName,
          imgURL: imgURL,
        })
      })
      generateIndexOffsets()
      displayCities()
      displayImages()
    } catch (error) {
      console.error('Error loading Google Sheets data:', error)
    }
  }

  // fetch clubs data
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
        let clb_city = columns[5]?.trim().replace(/"/g, '')

        clb_lng = parseFloat(stringLng)
        clb_lat = parseFloat(stringLat)

        clubs.push({
          name: clb_name,
          lat: clb_lat,
          lng: clb_lng,
          courts: clb_crts,
          courtNumber: clb_crt_number,
          clubCity: clb_city,
        })
      })
      // console.log(clubs)
    } catch (error) {
      console.error('Error loading Google Sheets data:', error)
    }
    // console.log(clubs)
  }

  // match city Index from city Name
  function matchCity(index) {
    const club_city = clubs[index].clubCity
    console.log('City extracted from CLUBS: ' + club_city)
    let cityToHandleIndex
    for (let k = 0; k < cities.length; k++) {
      if (cities[k].name === club_city) {
        cityToHandleIndex = k
      }
    }
    console.log('City matched to CITIES: ' + cities[cityToHandleIndex].name)
    currentCityIndex = cityToHandleIndex
    handleCity(cityToHandleIndex + 1)
    updateCount(cityToHandleIndex + 1)
  }

  // load markers
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
        markers.forEach((marker) => {
          const popup = marker.getPopup()
          if (popup && popup.isOpen()) {
            const popupEl = popup.getElement()
            if (popupEl) {
              popupEl.style.opacity = zoom < 12 ? '0' : '1'
            }
          }
        })
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
          matchCity(markersArrayIndex)

          gsap.to(
            domElements.club_p[
              markersArrayIndex - indexOffsets[currentCityIndex]
            ],
            {
              opacity: 1,
              duration: 0.4,
            }
          )
          handleClub(markersArrayIndex)
          // activate pointer events on clubs on first marker click
          if (!clubCardsDummy) {
            gsap.set(domElements.clubs_card, {
              pointerEvents: 'auto',
              onComplete: () => {
                domElements.clubs_card.style.pointerEvents = 'auto'
                clubCardsDummy = true
              },
            })
          }
        })
        return marker
      }
    })
  }

  // fly to city
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
  }

  // fly to club
  function flyToClub(index) {
    console.log('fly index: ' + index)
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

  // async init of MAP
  async function init() {
    await fetchDataCities()
    await fetchDataClubs()
    loadMarkers()
    loadNumbers()
  }
  init()

  // .............................. EVENT LISTENING .............................. //

  function setUpEventListeners() {
    // ------------------------ HOVER  ------------------------

    // card (highlighting)
    domElements.card.addEventListener('mouseover', (event) => {
      if (isTouch) return
      const card = event.currentTarget
      gsap.to(card, {
        backgroundColor: '#8b81e410',
        duration: hover_duration - 0.2,
      })
    })
    domElements.card.addEventListener('mouseleave', (event) => {
      if (isTouch) return
      const card = event.currentTarget
      gsap.to(card, {
        backgroundColor: '#ffffff00',
        duration: hover_duration,
      })
    })

    // clubs & courts cards (higlighting)
    domElements.clubs_card.addEventListener('mouseover', (event) => {
      if (isTouch) return
      const card = event.currentTarget
      gsap.to(card, {
        backgroundColor: '#8b81e410',
        duration: hover_duration - 0.2,
      })
    })
    domElements.clubs_card.addEventListener('mouseleave', (event) => {
      if (isTouch) return
      const card = event.currentTarget
      gsap.to(card, {
        backgroundColor: '#ffffff00',
        duration: hover_duration,
      })
    })
    domElements.courts_card.addEventListener('mouseover', (event) => {
      if (isTouch) return
      const card = event.currentTarget
      gsap.to(card, {
        backgroundColor: '#8b81e410',
        duration: hover_duration - 0.2,
      })
    })
    domElements.courts_card.addEventListener('mouseleave', (event) => {
      if (isTouch) return
      const card = event.currentTarget
      gsap.to(card, {
        backgroundColor: '#ffffff00',
        duration: hover_duration,
      })
    })

    // prevent scrolling
    map_wrapper.addEventListener('mouseenter', () => {
      document.body.classList.add('stop-scrolling')
    })
    map_wrapper.addEventListener('mouseleave', () => {
      document.body.classList.remove('stop-scrolling')
    })
  }
  setUpEventListeners()
}

export default map
