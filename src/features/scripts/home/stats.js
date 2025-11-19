import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function stats() {
  function isDesktop() {
    //prettier-ignore
    return window.innerWidth >= 768
  }
  const stats_section = document.querySelector('.stats')
  const boxes = document.querySelectorAll('.stats_box')
  const title = document.querySelector('.stats-title')
  const stats_card_headings = document.querySelectorAll('.stats-card-h')
  const stats_line = document.querySelector('.stats-line')
  const description = document.querySelector('.description-features')
  const titlesArray = [
    '',
    'Porcentaje de errores y winners por golpe',
    'VS Jugadores',
    'Velocidad de la bola',
    'Mapa de calor',
    'Total de golpes',
    'Metros recorridos',
    'Análisis de servicio',
    'Pad ID',
  ]
  const titlesArrayEN = [
    '',
    'Percentage of errors and winners per hit',
    'VS Players',
    'Ball speed',
    'Heatmap',
    'Total hits',
    'Metres covered',
    'Service analysis',
    'Pad ID',
  ]
  const descriptionsArray = [
    'Padmi ofrece estadísticas en tiempo real con información detallada sobre tu partido, contándote cuándo eres un genio y cuáles son tus puntos flacos.',
    'Podrás observar cuántos intercambios han finalizado en winners y errores, además del porcentaje de bolas pasadas al otro lado de la red.',
    'Compara tu rendimiento con el de otros jugadores dentro de la app y descubre quién domina en cada aspecto del juego.',
    'Detectamos y registramos la velocidad de cada impacto con precisión milimétrica, proporcionando información clave para optimizar tu rendimiento.',
    'Visualiza tu patrón de movimiento durante el partido, con un análisis detallado de las zonas que más has cubierto.',
    'Mide el total de impactos que has ejecutado, proporcionándote un desglose detallado del volumen y la frecuencia de tu juego.',
    'Registra la distancia total que te has desplazado en la pista para medir tu esfuerzo y resistencia en cada partido.',
    'Obtén datos detallados sobre la velocidad de tu saque, la efectividad de tus primeros y segundos servicios, y el número de dobles faltas.',
    'Tu cromo digital: toda tu información de rendimiento, estadísticas y nivel en un solo lugar. Personalizable y en constante evolución con cada partido.',
  ]
  const descriptionsArrayEN = [
    "Padmi offers real-time stats with detailed information about your match, telling you when you're playing brilliantly and where your weaknesses lie.",
    'How many rallies ended in winners and errors, as well as the percentage of balls passed over the net.',
    'Compare your performance with other players within the app and discover who dominates each aspect of the game.',
    'We detect and record the speed of each hit with pinpoint accuracy, providing key information to optimise your performance.',
    'Visualise your movement pattern during the match, with a detailed analysis of the areas you have covered the most.',
    'Measures the total number of hits you have executed, providing you with a detailed breakdown of the volume and frequency of your game.',
    'Total distance you have run on the court to analyse your effort and endurance during the match.',
    'Detailed data on your serve, including the effectiveness of your first and second serves.',
    'Your digital card: all your performance information, stats, and level in one place. Customisable and constantly evolving with each match.',
  ]
  const boxesArray = Array.from(boxes)
  const line = document.querySelector('.stats-line')
  const dot = document.querySelector('.stats-dot')

  let isClicked = false
  let isHoverActive = false

  const path = window.location.pathname // e.g. "/en/contact" or "/es/contact"
  const isEnglish = path.split('/').includes('en')

  // functions
  function setInitialState() {
    gsap.from(boxes, {
      opacity: 0,
      rotationZ: 0,
      duration: 0.7,
      stagger: 0.1,
      scrollTrigger: {
        trigger: boxes,
        start: 'top 90%',
      },
      onComplete: () => {
        isHoverActive = true
      },
    })
    gsap.from(stats_line, {
      opacity: 0,
      duration: 1.6,
      scrollTrigger: {
        trigger: stats_line,
        start: 'top 80%',
      },
    })
    if (!isEnglish) {
      description.textContent = descriptionsArray[0]
    } else {
      description.textContent = descriptionsArrayEN[0]
    }
  }

  const targetX = line.getBoundingClientRect().width
  // const dotWidth = dot.getBoundingClientRect().width
  function pinSection() {
    gsap.to(dot, {
      // x: targetX - dotWidth,
      width: targetX,
      scrollTrigger: {
        start: 'top top',
        end: 'bottom top',
        pin: stats_section,
        markers: false,
        scrub: true,
      },
    })
  }

  // function calls
  setInitialState()
  pinSection()

  // events
  function handleTitles(i) {
    if (!isEnglish) {
      title.textContent = titlesArray[i + 1]
      description.textContent = descriptionsArray[i + 1]
    } else {
      title.textContent = titlesArrayEN[i + 1]
      description.textContent = descriptionsArrayEN[i + 1]
    }
  }

  function hoverIn(event, cardIndex) {
    if (!isHoverActive) return
    if (isClicked) return
    // todas en gris menos la que pico
    boxesArray.forEach((box, index) => {
      if (index !== cardIndex) {
        gsap.to(box, {
          filter: 'saturate(0%)',
          duration: 0.6,
        })
      }
    })
    // hago cosas en la que pico
    const box = event.currentTarget
    gsap.to(box, {
      opacity: 1,
      scale: 0.99,
      y: -60,
      borderRadius: '16px',
      duration: 0.6,
    })
    gsap.to(stats_card_headings, {
      color: '#ceff05',
      duration: 0.6,
    })
    handleTitles(cardIndex)
  }

  function hoverOut(event) {
    if (!isHoverActive) return
    // if (isClicked) return
    const box = event.currentTarget
    gsap.to(boxes, {
      filter: 'saturate(80%)',
      duration: 0.6,
    })
    gsap.to(box, {
      scale: 1,
      y: 0,
      borderRadius: '8px',
      duration: 0.6,
    })
    gsap.to(stats_card_headings, {
      color: '#e5e7e1',
      duration: 0.6,
    })
    if (!isClicked) handleTitles(-1)
  }

  if (isDesktop()) {
    boxes.forEach((box, index) => {
      box.addEventListener('mouseenter', (event) => hoverIn(event, index))
      box.addEventListener('mouseleave', hoverOut)
    })
  }
}

export default stats
