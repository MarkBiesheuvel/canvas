Math.TWO_PI = 2 * Math.PI

const canvas = document.getElementsByTagName('canvas')[0]
const ctx = canvas.getContext('2d')

// Constants for directions
const directions = {
  UP: 0x01,
  DOWN: 0x02,
  LEFT: 0x03,
  RIGHT: 0x04
}

// Colors chosen from material.io color palettes
// https://material.io/guidelines/style/color.html#color-color-tool
const colors = {
  LIGHT_BLUE: '#03A9F4',
  RED: '#F44336',
  LIGHT_GREEN: '#8BC34A',
  ORANGE: '#FF9800',
  DEEP_PURPLE: '#673AB7'
}

// Some helpfull random functions
const random = {
  float: ({min = 0, max}) => (min + Math.random() * (max - min)),
  int: (options) => Math.floor(random.float(options)),
  key: (object) => {
    const keys = Object.keys(object)
    const index = random.int({max: keys.length})
    return object[keys[index]]
  }
}

const circles = []
let width = null
let height = null
let previousTimestamp = null

class Circle {
  constructor ({
    x,
    y,
    radius,
    velocity,
    color = colors.LIGHT_BLUE,
    direction = directions.RIGHT
  }) {
    // Set properties
    this.x = x
    this.y = y
    this.radius = radius
    this.velocity = velocity
    this.color = color
    this.direction = direction
    // Generate path
    this.path = new window.Path2D()
    this.path.arc(0, 0, radius, 0, Math.TWO_PI)
    // Set move function
    if (direction === directions.RIGHT) {
      this._move = (distance) => {
        this.x += distance
        if (this.x > width + this.radius) {
          this.x = -this.radius
        }
      }
    } else if (direction === directions.LEFT) {
      this._move = (distance) => {
        this.x -= distance
        if (this.x < -this.radius) {
          this.x = width + this.radius
        }
      }
    } else if (direction === directions.DOWN) {
      this._move = (distance) => {
        this.y += distance
        if (this.y > height + this.radius) {
          this.y = -this.radius
        }
      }
    } else if (direction === directions.UP) {
      this._move = (distance) => {
        this.y -= distance
        if (this.y < -this.radius) {
          this.y = height + this.radius
        }
      }
    } else {
      // Invalid direction
      console.error('Invalid direction', direction)
      this._move = () => {}
    }
  }

  draw () {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.fillStyle = this.color
    ctx.fill(this.path)
    ctx.restore()
  }

  move (delta) {
    const distance = delta * this.velocity
    this._move(distance)
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
  ctx.fillStyle = '#F5F5F5'
  ctx.fillRect(0, 0, width, height)
}

const requestFrame = () => {
  window.requestAnimationFrame(drawFrame)
}

const intialize = () => {
  refreshCanvas()

  for (let i = 1; i <= 20; i++) {
    const x = random.float({max: width})
    const y = random.float({max: height})
    const radius = random.float({min: 5, max: 15})
    const velocity = random.float({min: 0.25, max: 0.5})
    const color = random.key(colors)
    const direction = random.key(directions)

    circles.push(new Circle({x, y, radius, velocity, color, direction}))
  }

  requestFrame()
}

const drawFrame = (timestamp) => {
  // Calculate delta and set previous timestamp for next frame
  const delta = (previousTimestamp === null) ? 0 : (timestamp - previousTimestamp)
  previousTimestamp = timestamp

  // Move all objects
  circles.forEach((circle) => circle.move(delta))

  // Only take the drawing hit after everything is updated
  refreshCanvas()
  circles.forEach((circle) => circle.draw())
  requestFrame()
}

intialize()
