import { gsap } from 'gsap'

// import fbm from './shaders/fbm.js'

function dark_mode() {
  let isLightMode = false
  // Apply the mode based on the saved preference
  if (isLightMode) {
    body.classList.add('dark-mode')
  }

  // Toggle between dark and light mode

  // persistent
  // const white = '#e5e7e1'
  // const black = '#0a0b0b'
  // const green = '#ceff05'
  // const lila = '#8b81e4'

  const body = document.body
  const darkModeButton = document.querySelector('.darkmode-button')

  const dur = 0.5
  const ez = 'power2.inOut'

  function handleModes() {
    isLightMode = !isLightMode
    localStorage.setItem('lightMode', isLightMode)

    // Toggle the dark-mode class on the body
    if (isLightMode) {
      body.classList.add('light-mode')
    } else {
      body.classList.remove('light-mode')
    }

    const event = new CustomEvent('darkModeToggled', { detail: isLightMode })
    document.dispatchEvent(event)
  }

  function hoverIn() {
    gsap.to(darkModeButton, {
      scale: 1.05,
      duration: 0.5 * dur,
      ease: ez,
    })
  }

  function hoverOut() {
    gsap.to(darkModeButton, {
      scale: 1,
      duration: 0.5 * dur,
      ease: ez,
    })
  }

  // handleModes()
  // console.log('isDarkMode: ' + isDarkMode)

  if (darkModeButton) {
    darkModeButton.addEventListener('click', handleModes)
    darkModeButton.addEventListener('mouseover', hoverIn)
    darkModeButton.addEventListener('mouseleave', hoverOut)
  } else {
    console.warn('darkModeButton not found!')
  }
}

export default dark_mode
