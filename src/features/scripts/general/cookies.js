import { gsap } from 'gsap'
import SplitType from 'split-type'
// COOCKIE BUTTONS

function cookies() {
  // Tools
  window.dataLayer = window.dataLayer || []
  const stag = 0.016

  // Fetch from DOC
  function queryFromDoc() {
    return {
      cookies: document.querySelector('.cookies'),
      cookies_config: document.querySelector('.cookies-config-wrapper'),
      cookies_button_wrappers: document.querySelectorAll(
        '.cookie-butt-h-wrapper'
      ),
      cookies_txts: document.querySelectorAll('.cookie-butt-h'),
      cookie_toggles: document.querySelectorAll('.cookie-toggle'),
      footer_link_wrappers: document.querySelectorAll('.footer-col-link'),
    }
  }

  const domElements = queryFromDoc()

  // Button text arrays
  const splitTxtCookiesArray = []
  const splitTxtCookiesHiddenArray = []
  let counterNormal = 0
  let counterHidden = 0
  function initializeButtonTextArrays() {
    domElements.cookies_txts.forEach((txt, index) => {
      if (index % 2 == 0) {
        splitTxtCookiesArray[counterNormal] = new SplitType(txt, {
          types: 'chars',
        })
        counterNormal++
      } else {
        splitTxtCookiesHiddenArray[counterHidden] = new SplitType(txt, {
          types: 'chars',
        })
        counterHidden++
      }
    })
  }

  // This array has 3 items: analytics, marketing and personalization, that can be true or false. HAY QUE SINCRONIZARLO AL INICIAR
  let acceptedCookiesArray = [false, false, false]
  function syncAcceptedCookiesArrayFromStorage() {
    acceptedCookiesArray = [
      localStorage.getItem('analyticsCookies') === 'true',
      localStorage.getItem('marketingCookies') === 'true',
      localStorage.getItem('personalizationCookies') === 'true',
    ]
  }

  // Check if cookies are accepted or not
  function initializeCookieBanner() {
    if (localStorage.getItem('cookieSelectionConfirmedByUser') === 'true') {
      domElements.cookies.classList.add('not-active')
      window.dataLayer.push({})
      window.dataLayer.push({
        event: 'cookie-preferences-updated',
        analyticsCookies: localStorage.getItem('analyticsCookies'),
        marketingCookies: localStorage.getItem('marketingCookies'),
        personalizationCookies: localStorage.getItem('personalizationCookies'),
        allCookies: localStorage.getItem('allCookies'),
      })
      console.log(
        'localStorageArray: ' +
          [
            localStorage.getItem('analyticsCookies'),
            localStorage.getItem('marketingCookies'),
            localStorage.getItem('personalizationCookies'),
          ]
      )
      // document.body.classList.remove('stop-scrolling')
      // document.documentElement.classList.remove('stop-scrolling')
    } else {
      gsap.to(domElements.cookies, {
        delay: 3,
        opacity: 1,
        yPercent: -100,
        zIndex: 101,
        duration: 1.2,
        ease: 'power3.out',
      })
      // document.body.classList.add('stop-scrolling')
      // document.documentElement.classList.add('stop-scrolling')
      // console.log('body blocked')
    }
  }

  function updateToggles() {
    domElements.cookie_toggles.forEach((t, index) => {
      const ball = t.firstElementChild
      function toggleOn() {
        gsap.to(ball, {
          x: 24,
          backgroundColor: '#8b81e4',
        })
        gsap.to(t, {
          backgroundColor: '#e5e7e1',
          opacity: 1,
        })
        t.classList.add('is--accepted')
      }
      function toggleOff() {
        gsap.to(ball, {
          x: 0,
          backgroundColor: '#e5e7e1',
        })
        gsap.to(t, {
          backgroundColor: '#ffffff00',
          opacity: 0.8,
        })
        t.classList.remove('is--accepted')
      }
      if (
        localStorage.getItem('analyticsCookies') === 'true' &&
        t.id == 'analytics-toggle'
      ) {
        toggleOn()
      }
      if (
        localStorage.getItem('marketingCookies') === 'true' &&
        t.id == 'marketing-toggle'
      ) {
        toggleOn()
      }
      if (
        localStorage.getItem('personalizationCookies') === 'true' &&
        t.id == 'personalization-toggle'
      ) {
        toggleOn()
      }
      if (
        localStorage.getItem('analyticsCookies') !== 'true' &&
        t.id == 'analytics-toggle'
      ) {
        toggleOff()
      }
      if (
        localStorage.getItem('marketingCookies') !== 'true' &&
        t.id == 'marketing-toggle'
      ) {
        toggleOff()
      }
      if (
        localStorage.getItem('personalizationCookies') !== 'true' &&
        t.id == 'personalization-toggle'
      ) {
        toggleOff()
      }
    })
  }

  function init() {
    initializeButtonTextArrays()
    initializeCookieBanner()
    syncAcceptedCookiesArrayFromStorage()
    updateToggles()
  }
  init()

  // Clear local storage
  function clearCookiePreferencesInLocalStorage() {
    localStorage.removeItem('analyticsCookies')
    localStorage.removeItem('marketingCookies')
    localStorage.removeItem('personalizationCookies')
    localStorage.removeItem('allCookies')
  }

  // hide cookies
  function hideCookies() {
    gsap.to(domElements.cookies, {
      opacity: 0,
      yPercent: 100,
      zIndex: -30,
      duration: 0.4,
      ease: 'power3.inOut',
      onComplete: () => {
        domElements.cookies.classList.add('not-active')
        // document.body.classList.remove('stop-scrolling')
        // document.documentElement.classList.remove('stop-scrolling')
      },
    })
  }

  // Show cookie customization
  function showCookieCustomization() {
    if (!domElements.cookies_config.classList.contains('is--shown')) {
      gsap.to(domElements.cookies_config, {
        opacity: 1,
        duration: 0.2,
      })
      domElements.cookies_config.classList.add('is--shown')
    } else {
      gsap.to(domElements.cookies_config, {
        opacity: 0,
        duration: 0.2,
      })
      domElements.cookies_config.classList.remove('is--shown')
    }
  }

  // Show cookie customization from footer: needs to show the whole wrapper too
  function showCookieCustomizationFromFooter() {
    if (domElements.cookies.classList.contains('not-active')) {
      domElements.cookies.classList.remove('not-active')
      gsap.to(domElements.cookies, {
        opacity: 1,
        yPercent: -100,
        zIndex: 101,
        duration: 1.2,
        ease: 'power3.out',
      })
    }
    if (!domElements.cookies_config.classList.contains('is--shown')) {
      gsap.to(domElements.cookies_config, {
        opacity: 1,
        duration: 0.2,
      })
      domElements.cookies_config.classList.add('is--shown')
    } else {
      gsap.to(domElements.cookies_config, {
        opacity: 0,
        duration: 0.2,
      })
      domElements.cookies_config.classList.remove('is--shown')
    }
  }

  // Some cookies accepted
  function acceptSomeCookies(toggle) {
    console.log('some cookies accepted init')
    const ball = toggle.firstElementChild
    function toggleOn() {
      gsap.to(ball, {
        x: 24,
        backgroundColor: '#8b81e4',
      })
      gsap.to(toggle, {
        backgroundColor: '#e5e7e1',
        opacity: 1,
      })
    }
    function toggleOff() {
      gsap.to(ball, {
        x: 0,
        backgroundColor: '#e5e7e1',
      })
      gsap.to(toggle, {
        backgroundColor: '#ffffff00',
        opacity: 0.8,
      })
    }
    if (!toggle.classList.contains('is--accepted')) {
      toggleOn()

      // mark what cookie to reject
      if (toggle.id == 'analytics-toggle') {
        acceptedCookiesArray[0] = true
      } else if (toggle.id == 'marketing-toggle') {
        acceptedCookiesArray[1] = true
      } else if (toggle.id == 'personalization-toggle') {
        acceptedCookiesArray[2] = true
      }

      toggle.classList.add('is--accepted')
    } else {
      toggleOff()

      // mark what cookie to accept
      if (toggle.id == 'analytics-toggle') {
        acceptedCookiesArray[0] = false
      } else if (toggle.id == 'marketing-toggle') {
        acceptedCookiesArray[1] = false
      } else if (toggle.id == 'personalization-toggle') {
        acceptedCookiesArray[2] = false
      }

      toggle.classList.remove('is--accepted')
    }
    console.log('some cookies accepted end')
  }

  // Reject cookies
  function rejectCookies() {
    acceptedCookiesArray = [false, false, false]
    hideCookies()
    pushConfirmedCookies()
  }

  // Cookies accepted AND pushed
  function acceptAllCookies() {
    acceptedCookiesArray = [true, true, true]
    hideCookies()
    pushConfirmedCookies()

    localStorage.setItem('cookieSelectionConfirmedByUser', true)
  }

  // Push final data
  function pushConfirmedCookies() {
    clearCookiePreferencesInLocalStorage()
    hideCookies()
    console.log(acceptedCookiesArray)
    const allTrue = acceptedCookiesArray.every((val) => val === true)
    const allFalse = acceptedCookiesArray.every((val) => val === false)
    if (allTrue) {
      window.dataLayer.push({})
      window.dataLayer.push({
        event: 'cookie-preferences-updated',
        analyticsCookies: true,
        marketingCookies: true,
        personalizationCookies: true,
        allCookies: true,
      })
      localStorage.setItem('analyticsCookies', true)
      localStorage.setItem('marketingCookies', true)
      localStorage.setItem('personalizationCookies', true)
      localStorage.setItem('allCookies', true)

      localStorage.setItem('cookieSelectionConfirmedByUser', true)
    } else if (allFalse) {
      window.dataLayer.push({})
      window.dataLayer.push({
        event: 'cookie-preferences-updated',
        analyticsCookies: false,
        marketingCookies: false,
        personalizationCookies: false,
        allCookies: false,
      })
      localStorage.setItem('analyticsCookies', false)
      localStorage.setItem('marketingCookies', false)
      localStorage.setItem('personalizationCookies', false)
      localStorage.setItem('allCookies', false)

      localStorage.setItem('cookieSelectionConfirmedByUser', true)
    } else {
      window.dataLayer.push({})
      window.dataLayer.push({
        event: 'cookie-preferences-updated',
        analyticsCookies: acceptedCookiesArray[0],
        marketingCookies: acceptedCookiesArray[1],
        personalizationCookies: acceptedCookiesArray[2],
        allCookies: false,
      })
      localStorage.setItem('analyticsCookies', acceptedCookiesArray[0])
      localStorage.setItem('marketingCookies', acceptedCookiesArray[1])
      localStorage.setItem('personalizationCookies', acceptedCookiesArray[2])
      localStorage.setItem('allCookies', false)

      localStorage.setItem('cookieSelectionConfirmedByUser', true)
    }
    updateToggles()

    // Security check
    console.log({
      analyticsCookies: localStorage.getItem('analyticsCookies'),
      marketingCookies: localStorage.getItem('marketingCookies'),
      personalizationCookies: localStorage.getItem('personalizationCookies'),
      allCookies: localStorage.getItem('allCookies'),
    })
  }

  // Event listeners
  domElements.cookies_button_wrappers.forEach((w, index) => {
    // Hover
    w.addEventListener('mouseenter', () => {
      gsap.to(splitTxtCookiesArray[index].chars, {
        yPercent: -102,
        duration: 0.4,
        ease: 'power1.out',
        stagger: stag,
      })
      gsap.to(splitTxtCookiesHiddenArray[index].chars, {
        yPercent: -100,
        duration: 0.4,
        ease: 'power1.out',
        stagger: stag,
      })
    })
    w.addEventListener('mouseleave', () => {
      gsap.to(splitTxtCookiesArray[index].chars, {
        yPercent: 0,
        duration: 0.4,
        ease: 'power2.out',
        stagger: stag,
      })

      gsap.to(splitTxtCookiesHiddenArray[index].chars, {
        yPercent: 0,
        duration: 0.4,
        ease: 'power2.out',
        stagger: stag,
      })
    })

    // Click
    w.addEventListener('click', (e) => {
      const button = e.currentTarget
      if (button.id == 'reject-cookies' || button.id == 'reject-cookies-2') {
        rejectCookies()
      } else if (button.id == 'customize-cookies') {
        showCookieCustomization()
      } else if (
        button.id == 'accept-all-cookies' ||
        button.id == 'accept-all-cookies-2'
      ) {
        acceptAllCookies()
      } else if (button.id == 'confirm-cookies') {
        pushConfirmedCookies()
      }
    })
  })

  let toggle
  if (domElements.cookie_toggles) {
    domElements.cookie_toggles.forEach((t) => {
      // Hover
      t.addEventListener('mouseenter', (e) => {
        const tog = e.currentTarget
        gsap.to(tog, {
          opacity: 1,
          duration: 0.4,
          ease: 'power1.out',
        })
      })
      t.addEventListener('mouseleave', (e) => {
        const tog = e.currentTarget
        gsap.to(tog, {
          opacity: 0.8,
          duration: 0.4,
          ease: 'power1.out',
        })
      })

      // Click
      t.addEventListener('click', (e) => {
        toggle = e.currentTarget
        if (toggle.classList.contains('is--essential')) return // essential cookie don't provide interaction
        acceptSomeCookies(toggle)
      })
    })
  }

  domElements.footer_link_wrappers.forEach((w) => {
    if (w.classList.contains('is--cookie-config')) {
      w.addEventListener('click', () => {
        showCookieCustomizationFromFooter()
      })
    }
  })
}

// Ahora mismo, guardo la selección de cookies del usuario en un array y hago PUSH de los elementos del array al letor de eventos de GTM.
// Aunque el array se actualiza bien, no estoy seguro de que desactivar una casilla este BORRANDO la condición allá en GTM. Esto tengo que
// corregirlo después. Es decir, FUNCIONA, pero FALTA que hacerlo REVERSIBLE.

export default cookies
