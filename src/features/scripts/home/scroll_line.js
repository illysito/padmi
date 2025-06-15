import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function scroll_line() {
  const scrollLine = document.querySelector('.scrolled-line')

  function scroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight

    const maxScroll = scrollHeight - clientHeight

    const scrollProgress = maxScroll === 0 ? 0 : scrollTop / maxScroll

    // Get the current 98svh in px
    const svh = Math.min(window.innerHeight, window.innerWidth) * 0.98

    // Set the div height proportionally
    scrollLine.style.height = `${scrollProgress * svh}px`
  }

  window.addEventListener('scroll', scroll)
  window.addEventListener('resize', scroll)
}

export default scroll_line
