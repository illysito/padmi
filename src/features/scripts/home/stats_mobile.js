import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function stats_mobile() {
  const stats_wrapper = document.querySelector('.stats_wrapper-mob')
  const cards = document.querySelectorAll('.stats_box_wrapper')
  const left_arrow = document.querySelector('.arrow-left')
  const right_arrow = document.querySelector('.arrow-right')

  // console.log(cards)

  gsap.to(stats_wrapper, {
    opacity: 1,
    scrollTrigger: {
      trigger: stats_wrapper,
      start: 'top 75%',
    },
  })

  let currentIndex = 0

  function handleCards() {
    // console.log(currentIndex)
    left_arrow.style.pointerEvents = 'none'
    right_arrow.style.pointerEvents = 'none'

    cards.forEach((card, index) => {
      gsap.to(card, {
        opacity: index === currentIndex ? 1 : 0,
        duration: 0.2,
        ease: 'power1.inOut',
      })
    })

    left_arrow.style.pointerEvents = 'auto'
    right_arrow.style.pointerEvents = 'auto'
  }

  left_arrow.addEventListener('click', () => {
    currentIndex -= 1
    if (currentIndex < 0) currentIndex = 7
    handleCards()
  })
  right_arrow.addEventListener('click', () => {
    currentIndex += 1
    if (currentIndex > 7) currentIndex = 0
    handleCards()
  })
}

export default stats_mobile
