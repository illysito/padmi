import { gsap } from 'gsap'
import SplitType from 'split-type'
// COOCKIE BUTTONS

function cookies() {
  // Fetch from DOC
  const cookies = document.querySelector('.cookies')
  const cookies_button_wrapper = document.querySelectorAll(
    '.cookie-butt-h-wrapper'
  )
  const cookies_txt = document.querySelector('.cookie-butt-h')
  const cookies_txt_hidden = cookies_txt.nextElementSibling

  const splitTxtCookies = new SplitType(cookies_txt, {
    types: 'chars',
  })
  const splitTxtHiddenCookies = new SplitType(cookies_txt_hidden, {
    types: 'chars',
  })
  const stag = 0.016

  if (localStorage.getItem('cookiesAccepted')) {
    cookies.classList.add('not-active')
    // document.body.classList.remove('stop-scrolling')
    // document.documentElement.classList.remove('stop-scrolling')
  } else {
    gsap.to(cookies, {
      opacity: 1,
      zIndex: 101,
      duration: 0.8,
    })
    // document.body.classList.add('stop-scrolling')
    // document.documentElement.classList.add('stop-scrolling')
    // console.log('body blocked')
  }

  // Cookies accepted
  function acceptCookies() {
    gsap.to(cookies, {
      opacity: 0,
      zIndex: -30,
      duration: 0.6,
      onComplete: () => {
        cookies.classList.add('not-active')
        // document.body.classList.remove('stop-scrolling')
        // document.documentElement.classList.remove('stop-scrolling')
      },
    })

    localStorage.setItem('cookiesAccepted', true)
  }

  // Event listeners
  cookies_button_wrapper.forEach((w) => {
    w.addEventListener('mouseenter', () => {
      gsap.to(splitTxtCookies.chars, {
        yPercent: -102,
        duration: 0.4,
        ease: 'power1.out',
        stagger: stag,
      })
      gsap.to(splitTxtHiddenCookies.chars, {
        yPercent: -100,
        duration: 0.4,
        ease: 'power1.out',
        stagger: stag,
      })
    })
    w.addEventListener('mouseleave', () => {
      gsap.to(splitTxtCookies.chars, {
        yPercent: 0,
        duration: 0.4,
        ease: 'power2.out',
        stagger: stag,
      })

      gsap.to(splitTxtHiddenCookies.chars, {
        yPercent: 0,
        duration: 0.4,
        ease: 'power2.out',
        stagger: stag,
      })
    })
    w.addEventListener('click', () => {
      acceptCookies()
    })
  })
}

export default cookies
