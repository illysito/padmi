import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function numbers() {
  const headings = document.querySelectorAll('.numbers-h')
  const tags = document.querySelectorAll('.numbers-tag')
  const headingsArray = Array.from(headings)

  const clubs = []
  let clubCount = 0
  const courts = []
  let courtCount = 0
  const cities = []
  let cityCount = 0

  async function fetchDataClubs() {
    //prettier-ignore
    const urlCities = 'https://docs.google.com/spreadsheets/d/1vrx1C923eENudXx2PKNoUil72SChqlNxk3bscbVd2Y8/gviz/tq?tqx=out:csv'
    try {
      const response = await fetch(urlCities)
      const data = await response.text()

      const rows = data.split('\n').slice(1) // Remove header
      rows.forEach((row, index) => {
        const columns = row.split(',')

        if (columns.length < 3) {
          console.warn(`Skipping row ${index + 1}: Not enough columns`)
          return
        }

        let club = columns[3]?.trim().replace(/"/g, '')
        let court = columns[4]?.trim().replace(/"/g, '')
        club = parseFloat(club)
        court = parseFloat(court)
        clubs.push(club)
        courts.push(court)
        // console.log(clubs)
      })
    } catch (error) {
      console.error('Error loading Google Sheets data:', error)
    }
  }

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

        let name = columns[0]?.trim().replace(/"/g, '')

        cities.push(name)
      })
    } catch (error) {
      console.error('Error loading Google Sheets data:', error)
    }
  }

  function countCities() {
    cityCount = cities.length
  }
  function countClubs() {
    for (let i = 0; i < clubs.length; i++) {
      clubCount += clubs[i]
    }
    console.log('clubs: ' + clubCount)
    // headingsArray[1].textContent = clubCount
  }

  function countCourts() {
    for (let i = 0; i < courts.length; i++) {
      courtCount += courts[i]
    }
    console.log('courts: ' + courtCount)
    // headingsArray[2].textContent = courtCount
  }

  function displayNumbers() {
    let time = 40

    let cityCounter = Math.floor(cityCount / 4)
    const cityInterval = setInterval(() => {
      headingsArray[0].textContent = cityCounter
      cityCounter++
      if (cityCounter > cityCount) clearInterval(cityInterval)
    }, time)

    let clubCounter = Math.floor(clubCount / 4)
    const clubInterval = setInterval(() => {
      headingsArray[1].textContent = clubCounter
      clubCounter++
      if (clubCounter > clubCount) clearInterval(clubInterval)
    }, time)

    let courtCounter = Math.floor(courtCount / 4)
    const courtInterval = setInterval(() => {
      headingsArray[2].textContent = courtCounter
      courtCounter++
      if (courtCounter > courtCount) clearInterval(courtInterval)
    }, time)

    // headingsArray[0].textContent = cityCount
    // headingsArray[1].textContent = clubCount
    // headingsArray[2].textContent = courtCount
  }

  function observeNumbers() {
    const trigger = document.querySelector('.numbers') // or any element wrapping your counters

    gsap.to(tags, {
      opacity: 1,
      scrollTrigger: {
        trigger: tags,
        start: 'top bottom',
        end: 'top 65%',
        markers: false,
      },
    })

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(headings, {
              opacity: 1,
              yPercent: -100,
              duration: 1.2,
              ease: 'power1.inOut',
              stagger: 0.2,
            })
            displayNumbers()
            observer.unobserve(entry.target) // run once
          }
        })
      },
      { threshold: 0.5 }
    ) // Adjust if needed (0.5 = 50% visible)

    if (trigger) observer.observe(trigger)
  }

  async function init() {
    await fetchDataClubs()
    await fetchDataCities()
    countCities()
    countClubs()
    countCourts()
    observeNumbers()
  }
  init()
}

export default numbers
