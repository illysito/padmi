import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

function split() {
  // ELEMENTS
  const claim = document.querySelector('.claim-heading-2')
  const p_claim = document.querySelector('.p-claim')
  const card_heading = document.querySelectorAll('.card-heading')
  const card_p = document.querySelectorAll('.card-p')
  const bento = document.querySelector('.bento')
  // const download = document.querySelector('.download-heading')
  // to secretly fade out
  // const downloadClaim = new SplitType(download, { types: 'lines' })

  // CLAIM
  const splitClaim = new SplitType(claim, { types: 'lines' })
  const pSplitClaim = new SplitType(p_claim, { types: 'lines' })

  splitClaim.lines.forEach((line) => {
    const wrapper = document.createElement('div')
    wrapper.style.overflow = 'hidden'
    wrapper.style.display = 'block'

    line.parentNode.insertBefore(wrapper, line)
    wrapper.appendChild(line)
  })
  pSplitClaim.lines.forEach((line) => {
    const wrapper = document.createElement('div')
    wrapper.style.overflow = 'hidden'
    wrapper.style.display = 'block'

    line.parentNode.insertBefore(wrapper, line)
    wrapper.appendChild(line)
  })

  gsap.from([splitClaim.lines, pSplitClaim.lines], {
    scaleY: 0.4,
    yPercent: 100,
    duration: 1,
    ease: 'power1.out',
    stagger: 0.2,
    scrollTrigger: {
      trigger: claim,
      start: 'top 80%',
      end: 'top 85%',
      markers: false,
    },
  })

  //CARD HEADINGS
  card_heading.forEach((heading) => {
    const splitCardHeading = new SplitType(heading, { types: 'lines' })

    splitCardHeading.lines.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      wrapper.style.display = 'block'

      line.parentNode.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    gsap.from(splitCardHeading.lines, {
      yPercent: 100,
      duration: 0.8,
      ease: 'power1.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: bento,
        start: 'top 90%',
        end: 'top 80%',
        markers: false,
      },
    })
  })

  const p = Array.from(card_p)
  gsap.to(p, {
    opacity: 1,
    duration: 2,
    scrollTrigger: {
      trigger: bento,
      start: 'top 85%',
      markers: false,
    },
  })
  // downloadClaim.lines.forEach((line) => {
  //   const wrapper = document.createElement('div')
  //   wrapper.style.overflow = 'hidden'
  //   wrapper.style.display = 'block'

  //   line.parentNode.insertBefore(wrapper, line)
  //   wrapper.appendChild(line)
  // })
}

export default split
