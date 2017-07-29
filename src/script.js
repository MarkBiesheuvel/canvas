Math.TWO_PI = 2 * Math.PI

const canvas = document.getElementsByTagName('canvas')[0]
const ctx = canvas.getContext('2d')

const colors = ['red', 'blue', 'green', 'yellow', 'purple']
const circles = []
let width = null
let height = null
let previousTimestamp = null

class Circle {
  constructor ({x, y, radius, velocity, color = 'black'}) {
    // Set properties
    this.x = x
    this.y = y
    this.radius = radius
    this.velocity = velocity
    this.color = color
    // Generate path
    this.path = new window.Path2D()
    this.path.arc(0, 0, radius, 0, Math.TWO_PI)
  }

  draw () {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.fillStyle = this.color
    ctx.fill(this.path)
    ctx.restore()
  }

  move (delta) {
    this.x += delta * this.velocity
    if (this.x > width + this.radius) {
      this.x = -this.radius
    }
  }
}

const refreshCanvas = () => {
  width = canvas.clientWidth
  height = canvas.clientHeight

  if (width !== canvas.width) {
    canvas.width = width
  }
  if (height !== canvas.height) {
    canvas.height = height
  }

  ctx.clearRect(0, 0, width, height)
}

const requestFrame = () => {
  window.requestAnimationFrame(drawFrame)
}

const intialize = () => {
  for (let i = 1; i <= 10; i++) {
    const x = 0
    const y = i * 50
    const radius = Math.random() * 10 + 5
    const velocity = Math.random() * 0.5 + 0.25
    const color = colors[Math.floor(Math.random() * colors.length)]
    circles.push(new Circle({x, y, radius, velocity, color}))
  }
  requestFrame()
}

const drawFrame = (timestamp) => {
  // Calculate delta and set previous timestamp for next frame
  const delta = (previousTimestamp === null) ? 0 : (timestamp - previousTimestamp)
  previousTimestamp = timestamp

  // Move all objects
  circles.forEach(circle => circle.move(delta))

  // Only take the drawing hit after everything is updated
  refreshCanvas()
  circles.forEach(circle => circle.draw())
  requestFrame()
}

intialize()
