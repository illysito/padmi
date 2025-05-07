import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

function split() {
  // ELEMENTS
  const claim = document.querySelectorAll('.claim-heading')
  const stats = document.querySelector('.stats')
  const stats_heading = document.querySelectorAll('.stats-heading')
  const descriptions = document.querySelectorAll('.description-features')

  claim.forEach((c) => {
    const splitClaim = new SplitType(c, { types: 'lines' })
    splitClaim.lines.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      wrapper.style.display = 'block'

      line.parentNode.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })
    gsap.from(splitClaim.lines, {
      scaleY: 0.4,
      yPercent: 100,
      duration: 1,
      ease: 'power1.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: c,
        start: 'top 80%',
        end: 'top 85%',
        markers: false,
      },
    })
  })

  // CARD HEADINGS
  stats_heading.forEach((heading) => {
    const splitStatsHeading = new SplitType(heading, { types: 'lines' })

    splitStatsHeading.lines.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      wrapper.style.display = 'block'

      line.parentNode.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    gsap.from(splitStatsHeading.lines, {
      yPercent: 100,
      duration: 0.8,
      ease: 'power1.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: stats,
        start: 'top 80%',
        end: 'top 60%',
        markers: false,
      },
    })
  })

  descriptions.forEach((desc) => {
    const splitStatsDesc = new SplitType(desc, { types: 'lines' })

    splitStatsDesc.lines.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      wrapper.style.display = 'block'

      line.parentNode.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    gsap.from(splitStatsDesc.lines, {
      yPercent: 100,
      duration: 0.8,
      ease: 'power1.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: stats,
        start: 'top 80%',
        end: 'top 60%',
        markers: false,
      },
    })
  })
}

export default split
