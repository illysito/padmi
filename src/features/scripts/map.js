import gsap from 'gsap'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

function map() {
  const map_wrapper = document.querySelector('.map')
  const map = new maplibregl.Map({
    container: 'map', // ID of your HTML element
    style: `https://api.maptiler.com/maps/5af093ac-6e4a-49cb-b247-bd629a603481/style.json?key=OFwEOATP6EiKKl7TcWZ6`,
    center: [-3.70256, 40.4165], // Longitude, Latitude (Madrid)
    zoom: 10, // Adjust the zoom level
    attributionControl: false,
  })

  async function loadMarkers() {
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
        console.log(`Longitude: ${stringLng}, Latitude: ${stringLat}`)
        console.log('Type of Longitude:', typeof stringLng)
        console.log('Type of Latitude:', typeof stringLat)
        if (!stringLng || !stringLat) {
          console.log('Longitude or Latitude is empty or invalid')
        } else {
          lng = parseFloat(stringLng)
          lat = parseFloat(stringLat)
          console.log('Parsed Longitude:', lng, 'Parsed Latitude:', lat)
        }

        console.log(`Raw row data: "${row}"`)

        if (isNaN(lat) || isNaN(lng)) {
          //prettier-ignore
          console.warn(`Skipping row ${index + 1}: Invalid lat/lng values`, { name, lng, lat })
          return
        }

        new maplibregl.Marker({
          element: createCustomImageMarker(), // Function to create an image marker
        })
          .setLngLat([lng, lat])
          .setPopup(
            new maplibregl.Popup({ className: 'popup', offset: [0, -28] }) // Add custom class
              .setHTML(`<div class="popup-content">${name}</div>`)
          )
          .addTo(map)

        // Function to create an image marker
        function createCustomImageMarker() {
          const marker = document.createElement('div')
          marker.className = 'custom-marker'
          //prettier-ignore
          marker.style.backgroundImage = 'url(https://raw.githubusercontent.com/illysito/padmi/main/map_marker.png)'
          marker.style.width = '30px'
          marker.style.height = '41px'
          marker.style.backgroundSize = 'cover'

          marker.addEventListener('click', () => {
            // Animate the map zooming out to the marker's coordinates
            map.flyTo({
              center: [lng, lat], // Set the center to the marker's location
              zoom: 18, // Set the zoom level to a low level for zooming out (you can adjust this as needed)
              speed: 2, // Animation speed (1 is standard)
              curve: 2, // Animation curve (1 is standard)
              easing(t) {
                return t // Linear easing (you can change it for different effects)
              },
            })
          })

          return marker
        }
      })
    } catch (error) {
      console.error('Error loading Google Sheets data:', error)
    }
  }
  // Load markers on the map
  loadMarkers()

  map_wrapper.addEventListener('mouseenter', () => {
    // console.log('scroll should stop')
    document.body.classList.add('stop-scrolling')
  })

  map_wrapper.addEventListener('mouseleave', () => {
    // console.log('scroll should resume')
    document.body.classList.remove('stop-scrolling')
  })

  // HEADINGS

  const court_heading = document.querySelectorAll('.court-heading')
  const court = document.querySelectorAll('.court')
  gsap.to(court_heading, {
    opacity: 1,
    yPercent: -100,
    duration: 1.4,
  })

  function hoverIn(event) {
    const wrapper = event.currentTarget
    const h = wrapper.firstElementChild
    const hidden_h = h.nextElementSibling
    gsap.to([h, hidden_h], {
      yPercent: -200,
      duration: 0.4,
    })
  }

  function hoverOut(event) {
    const wrapper = event.currentTarget
    const h = wrapper.firstElementChild
    const hidden_h = h.nextElementSibling
    gsap.to([h, hidden_h], {
      yPercent: -100,
      duration: 0.4,
    })
  }

  court.forEach((court) => {
    court.addEventListener('mouseover', hoverIn)
    court.addEventListener('mouseleave', hoverOut)
  })
}

export default map
