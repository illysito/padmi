import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

function split() {
  // ELEMENTS
  // const claim_section = document.querySelector('.video')
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
  // const video_section = document.querySelector('.video')
  // const splitClaimLinesArray = Array.from(splitClaim.lines)
  // const lastClaimLine = splitClaimLinesArray[2]
  // // const splitLastLine = new SplitType(lastClaimLine, { types: 'chars' })
  // const targetLine = Array.from(lastClaimLine.textContent)
  // console.log(targetLine)

  // // computer effect ritardando
  // let countIndex = 0
  // let countChar = ''
  // function randomChar() {
  //   //prettier-ignore
  //   const chars = 'abcdefghijklmnopqrstuvwxyzáéíóú.'
  //   countChar = chars[countIndex]
  //   countIndex = (countIndex + 1) % 62
  // }

  // function generateLastLine() {
  //   const targetChars = targetLine

  //   const time = 20

  //   let names = new Array(targetChars.length).fill(' ')
  //   names[0] = targetChars[0]

  //   let index = 1

  //   const animate = () => {
  //     if (index < targetChars.length) {
  //       if (names[index] !== targetChars[index]) {
  //         randomChar()
  //         names[index] = countChar
  //         if (targetChars[index] === ' ') {
  //           names[index] = targetChars[index]
  //         }
  //         if (countIndex == 12) {
  //           names[index] = targetChars[index]
  //         }
  //       } else {
  //         countIndex = 0
  //         index++ // Move to the next character only when correct
  //       }

  //       lastClaimLine.style.fontWeight = '500'
  //       lastClaimLine.style.color = '#8b81e4'
  //       lastClaimLine.textContent = names.join('')

  //       setTimeout(animate, time * 2.35)
  //     }
  //   }
  //   animate()
  // }
  // generateLastLine()

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

  // gsap.to(claim, {
  //   scale: 40,
  //   duration: 1,
  //   // ease: 'power1.out',
  //   scrollTrigger: {
  //     trigger: claim_section,
  //     start: 'bottom 40%',
  //     end: 'bottom -100%',
  //     markers: true,
  //     scrub: true,
  //   },
  // })

  // QUIERO QUE LA TIPOGRAFIA CAMBIE UN SCROLL! o que las LETRAS DE PADEL CAMBIEN Y SE PONGA JUEGO!

  // CARD HEADINGS
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
        start: 'top 80%',
        end: 'top 60%',
        markers: false,
      },
    })
  })

  const p = Array.from(card_p)
  gsap.to(p, {
    opacity: 1,
    duration: 2.5,
    scrollTrigger: {
      trigger: bento,
      start: 'top 65%',
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
