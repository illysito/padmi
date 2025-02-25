import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

function claim() {
  // ELEMENTS
  const claim = document.querySelector('.claim-heading-2')
  const download = document.querySelector('.download-heading')
  // to secretly fade out

  // SPLIT
  const splitClaim = new SplitType(claim, { types: 'lines' })
  const downloadClaim = new SplitType(download, { types: 'lines' })

  splitClaim.lines.forEach((line) => {
    const wrapper = document.createElement('div')
    wrapper.style.overflow = 'hidden'
    wrapper.style.display = 'block'

    line.parentNode.insertBefore(wrapper, line)
    wrapper.appendChild(line)
  })

  downloadClaim.lines.forEach((line) => {
    const wrapper = document.createElement('div')
    wrapper.style.overflow = 'hidden'
    wrapper.style.display = 'block'

    line.parentNode.insertBefore(wrapper, line)
    wrapper.appendChild(line)
  })

  gsap.from([downloadClaim.lines, splitClaim.lines], {
    yPercent: 100,
    duration: 0.8,
    ease: 'power1.out',
    stagger: 0.2,
    scrollTrigger: {
      trigger: claim,
      start: 'top 99%',
      end: 'top 85%',
      markers: false,
    },
  })
}

export default claim
