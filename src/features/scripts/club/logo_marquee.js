import { gsap } from 'gsap'

function logoMarquee() {
  const containers = document.querySelectorAll('.logos-container')
  const containersArray = Array.from(containers)
  const URLS = []
  const IMGS = []
  const IMGS_2 = []

  let img_width = 0

  async function fetchImages() {
    //prettier-ignore
    const url = 'https://docs.google.com/spreadsheets/d/1l2hwyfeEsikuUxOnElCLD6jzxJPD-Nf8amHTDHd6FEk/gviz/tq?tqx=out:csv'
    try {
      const response = await fetch(url)
      const data = await response.text()

      const rows = data.split('\n').slice(1) // Remove header
      rows.forEach((row) => {
        const columns = row.split(',')

        let imgURL = columns[1]?.trim().replace(/"/g, '')

        URLS.push(imgURL)
      })
    } catch (error) {
      console.error('Error loading Google Sheets data:', error)
    }
    // console.log(URLS)
  }

  function createImages() {
    // setting content
    for (let i = 0; i < URLS.length; i++) {
      const img = document.createElement('img')
      const img2 = document.createElement('img')
      img.classList.add('club-logo')
      img2.classList.add('club-logo')

      const currentURL = URLS[i]
      // console.log(URL)
      const match = currentURL.match(/\/d\/([^/]+)/)
      const id = match ? match[1] : null
      const SRC = 'https://drive.google.com/thumbnail?id=' + id + '&sz=s800'
      // console.log(SRC)
      img.src = SRC
      img2.src = SRC

      if (URLS.length % 2 == 0) {
        img_width = 72 / (URLS.length / 2)
      } else {
        img_width = 72 / ((URLS.length + 1) / 2)
      }
      // console.log(img_width)

      IMGS.push(img)
      IMGS_2.push(img2)
    }
  }

  function setSizes() {
    const images = document.querySelectorAll('.club-logo')
    images.forEach((img) => {
      img.style.width = `${img_width}%`
    })
  }

  function attachImages() {
    // console.log(containersArray)
    const c1 = containersArray[0]
    const c2 = containersArray[1]
    const c3 = containersArray[2]
    const c4 = containersArray[3]

    if (IMGS.length % 2 == 0) {
      for (let i = 0; i < IMGS.length / 2; i++) {
        c1.appendChild(IMGS[i])
        c2.appendChild(IMGS_2[i])
      }
      for (let j = IMGS.length / 2; j < IMGS.length; j++) {
        c3.appendChild(IMGS[j])
        c4.appendChild(IMGS_2[j])
      }
    } else {
      for (let i = 0; i < (IMGS.length - 1) / 2; i++) {
        c1.appendChild(IMGS[i])
        c2.appendChild(IMGS_2[i])
      }
      for (let j = (IMGS.length - 1) / 2; j < IMGS.length; j++) {
        c3.appendChild(IMGS[j])
        c4.appendChild(IMGS_2[j])
      }
    }
  }

  function animate() {
    containers.forEach((c, index) => {
      let dir = 1
      index > 1 ? (dir = -1) : (dir = 1)
      gsap.to(c, {
        xPercent: -100 * dir,
        duration: 32,
        ease: 'linear',
        repeat: -1,
      })
    })
  }

  async function init() {
    await fetchImages()
    createImages()
    setSizes()
    attachImages()
    animate()
  }
  init()
}

export default logoMarquee
