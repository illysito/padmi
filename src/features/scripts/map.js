import gsap from 'gsap'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

import map_nav from './map_nav'

function map() {
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
          console.log(markersArrayIndex)
        })
        return marker
      }
    })
  }

  // ASYNC INITIALIZATION

  async function init() {
    await fetchDataCities()
    await fetchDataClubs()
    map_nav(cities, clubs)
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

  const city_names = document.querySelectorAll('.city-header')
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
