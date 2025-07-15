import { gsap } from 'gsap'

function preloader() {
  const preloader = document.querySelector('.preloader')
  const preloader_counter = document.querySelector('.preloader_counter')

  let res = 36
  let w = preloader.getBoundingClientRect().width
  let h = preloader.getBoundingClientRect().height

  let squares
  let squaresArray

  function createGrid() {
    for (let i = 0; i < Math.ceil(w / res) * res; i += res) {
      for (let j = 0; j < Math.ceil(h / res) * res; j += res) {
        const sq = document.createElement('div')
        sq.classList.add('square')
        sq.style.width = `${res}px`
        sq.style.height = `${res}px`
        sq.style.backgroundColor = '#000000'
        sq.style.zIndex = 0
        preloader.appendChild(sq)
        console.log('square appended')
      }
    }
    squares = document.querySelectorAll('.square')
    squaresArray = Array.from(squares)
  }

  async function counter() {
    return new Promise((resolve) => {
      gsap.to(preloader_counter, {
        opacity: 1,
        duration: 0.6,
      })
      let i = 0
      const interval = setInterval(() => {
        preloader_counter.textContent = `${i} %`
        i++
        if (i > 100) {
          clearInterval(interval)
          gsap.to(preloader_counter, {
            opacity: 0,
            duration: 1.2,
            ease: 'power1.inOut',
            onComplete: () => {
              resolve()
            },
          }) // resolve when done
        }
      }, 30)
    })
  }

  function shuffleGrid(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]] // swap
    }
  }

  function animateGrid() {
    gsap.to(squaresArray, {
      opacity: 0,
      stagger: res / 22000,
      duration: 0.6,
      onComplete: () => {
        preloader.style.zIndex = -100
      },
    })
  }

  function isShown() {
    localStorage.setItem('preloaderShown', true)
  }

  async function init() {
    createGrid()
    await counter()
    shuffleGrid(squaresArray)
    animateGrid()
    isShown()
  }
  init()
}

export default preloader
