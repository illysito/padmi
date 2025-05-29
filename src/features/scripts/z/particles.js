import gsap from 'gsap'

function particles() {
  let ctx
  let textCoordinates
  let particlesArray = []
  let adjustX = 0
  let adjustY = 0
  let spread = 1

  function createCanvas() {
    const hero_section = document.querySelector('.aux-hero')
    const canvas = document.createElement('canvas')
    canvas.id = 'particles-canvas'
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    hero_section.appendChild(canvas)

    ctx = canvas.getContext('2d')
    ctx.fillStyle = 'white'
    ctx.font = '200px Times'
    ctx.fillText('play smarter.', 0, window.innerHeight / 2)
    textCoordinates = ctx.getImageData(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    )
  }

  // console.log(particlesArray)

  // #region handle mouse
  const mouse = {
    x: 0,
    y: 0,
    radius: 100,
  }

  window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.pageY
  })
  //#endregion

  //#region PARTICLE CLass
  class Particle {
    constructor(x, y, size) {
      this.x = x
      this.y = y
      this.size = size
      this.baseX = this.x // we need to remember where the particles came from
      this.baseY = this.y // we need to remember where the particles came from
      this.baseSize = this.size
      this.density = Math.random() * 30 + 1
    }

    draw() {
      ctx.fillStyle = 'white'
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.closePath()
      ctx.fill()
    }

    update() {
      let dx = mouse.x - this.x
      let dy = mouse.y - this.y
      let distance = Math.sqrt(dx * dx + dy * dy)

      let forceDirectionX = dx / distance
      let forceDitectionY = dy / distance

      let maxDistance = mouse.radius
      let force = gsap.utils.mapRange(0, maxDistance, 1, 0, distance)
      let directionX = force * forceDirectionX * this.density
      let directionY = force * forceDitectionY * this.density

      if (distance < mouse.radius) {
        this.x -= directionX
        this.y -= directionY
      } else {
        if (this.x !== this.baseX) {
          let dx = this.x - this.baseX
          this.x -= dx / 10
        }
        if (this.y !== this.baseY) {
          let dy = this.y - this.baseY
          this.y -= dy / 10
        }
      }
    }
  }
  //#endregion

  function createArray() {
    for (let i = 0, i2 = textCoordinates.height; i < i2; i++) {
      for (let j = 0, j2 = textCoordinates.width; j < j2; j++) {
        const index = (i * textCoordinates.width + j) * 4
        const alpha = textCoordinates.data[index + 3]
        if (alpha > 128) {
          let posX = j + adjustX
          let posY = i + adjustY
          particlesArray.push(
            new Particle(posX * spread, posY * spread, Math.random() * 0.8)
          )
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    particlesArray.forEach((particle) => {
      particle.draw()
      particle.update()
    })
    requestAnimationFrame(animate)
  }

  // #region INIT
  function init() {
    createCanvas()
    createArray()
    animate()
  }
  init()
  // #endregion
}

export default particles
