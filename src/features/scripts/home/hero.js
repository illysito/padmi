import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

function hero() {
  function isDesktopOrTablet() {
    return window.innerWidth >= 768
    // return true
  }
  // ELEMENTS
  if (isDesktopOrTablet()) {
    const hero = document.querySelector('.hero')
    const claim = document.querySelector('.claim-heading')
    const download_wrapper = document.querySelector('.download-h-wrapper')
    const download = document.querySelectorAll('.download-heading')
    const badge = document.querySelectorAll('.app-badge')
    const world_container = document.querySelector('.world-container')
    const motto = document.querySelector('.motto-hero')
    const qr = document.querySelector('.qr')
    const scroll_icon = document.querySelector('.scroll-icon-hero')

    // SCROLL INVITATION
    let count = 0
    let hover_duration = 0.6
    const maxRepeats = 11
    gsap.to(scroll_icon, {
      opacity: 1,
      duration: 0.6,
      onComplete: () => {
        gsap.to(scroll_icon, {
          opacity: 0,
          repeat: maxRepeats - 1, // Since the initial animation counts as 1
          yoyo: true,
          repeatDelay: hover_duration / 1.25,
          duration: 0.6,
          onRepeat: function () {
            count++
            // console.log(count)
            if (count >= maxRepeats) {
              gsap.set(scroll_icon, { opacity: 0 })
            }
          },
        })
      },
    })

    // SPLIT
    const splitClaim = new SplitType(claim, { types: 'lines' })

    splitClaim.lines.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      wrapper.style.display = 'block'

      line.parentNode.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    gsap.to(world_container, {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.7,
      ease: 'power2.inOut',
    })

    gsap.to([badge, download, motto], {
      scale: 1,
      opacity: 1,
      duration: 4,
      ease: 'power2.inOut',
    })

    gsap.to(hero, {
      autoAlpha: 0,
      scrollTrigger: {
        trigger: hero,
        start: 'bottom 98%',
        end: 'bottom 30%',
        scrub: 1,
        markers: false,
      },
    })

    download_wrapper.addEventListener('mouseover', () => {
      gsap.to(qr, {
        opacity: 1,
        duration: 0.4,
      })
    })
    download_wrapper.addEventListener('mouseleave', () => {
      gsap.to(qr, {
        opacity: 0,
        duration: 0.4,
      })
    })
  } else {
    const moving_bg = document.querySelector('.moving-bg')
    const claim_section = document.querySelector('.claim')
    gsap.set(moving_bg, {
      opacity: 0,
    })
    gsap.to(moving_bg, {
      opacity: 1,
      scrollTrigger: {
        trigger: claim_section,
        start: 'top 20%',
        end: 'bottom top',
        scrub: true,
      },
    })
  }
}

export default hero
