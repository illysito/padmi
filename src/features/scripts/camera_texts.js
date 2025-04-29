import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

function cameraTexts() {
  // ELEMENTS
  const texts = document.querySelectorAll('.cam-p-2')

  // CLAIM
  texts.forEach((text) => {
    const splitTexts = new SplitType(text, { types: 'lines' })

    splitTexts.lines.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      wrapper.style.display = 'block'

      line.parentNode.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    gsap.from(splitTexts.lines, {
      yPercent: 100,
      duration: 1,
      ease: 'power1.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: splitTexts.lines,
        start: 'top bottom',
        // end: 'top top',
        markers: false,
      },
      // scrub: true,
    })
  })
}

export default cameraTexts
