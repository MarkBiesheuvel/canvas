Math.TWO_PI = 2 * Math.PI

const circlesPerLane = 5
const laneSize = 250

const canvas = document.getElementsByTagName('canvas')[0]
const ctx = canvas.getContext('2d')

// Constants for directions
const directions = {
  UP: 0x01,
  DOWN: 0x02,
  LEFT: 0x03,
  RIGHT: 0x04
}

// Constants for lane types
const laneTypes = {
  UP_ONLY: 0xF1,
  DOWN_ONLY: 0xF2,
  UP_AND_DOWN: 0xF3,
  LEFT_ONLY: 0xF4,
  RIGHT_ONLY: 0xF5,
  LEFT_AND_RIGHT: 0xF6
}

const verticalLaneTypes = [
  laneTypes.UP_ONLY,
  laneTypes.DOWN_ONLY,
  laneTypes.UP_AND_DOWN
]

const horizontalLaneTypes = [
  laneTypes.LEFT_ONLY,
  laneTypes.RIGHT_ONLY,
  laneTypes.LEFT_AND_RIGHT
]

const allowedDirections = {
  [laneTypes.UP_ONLY]: [directions.UP],
  [laneTypes.DOWN_ONLY]: [directions.DOWN],
  [laneTypes.UP_AND_DOWN]: [directions.UP, directions.DOWN],
  [laneTypes.LEFT_ONLY]: [directions.LEFT],
  [laneTypes.RIGHT_ONLY]: [directions.RIGHT],
  [laneTypes.LEFT_AND_RIGHT]: [directions.LEFT, directions.RIGHT]
}

// Colors chosen from material.io color palettes
// https://material.io/guidelines/style/color.html#color-color-tool
const colors = {
  RED: '#F44336',
  ORANGE: '#FF9800',
  LIGHT_BLUE: '#03A9F4',
  LIGHT_GREEN: '#8BC34A',
  DEEP_PURPLE: '#673AB7'
}

// Some helpfull random functions
const random = {
  float: ({min = 0, max}) => (min + Math.random() * (max - min)),
  int: (options) => Math.floor(random.float(options)),
  item: (array) => array[random.int({max: array.length})],
  key: (object) => object[random.item(Object.keys(object))]
}

const circles = []
const lanes = []
let width = null
let height = null
let previousTimestamp = null

class Lane {
  constructor ({
    x = 0,
    y = 0,
    type
  }) {
    this.x = x
    this.y = y
    this.type = type
  }

  draw () {
    if (this.type == laneTypes.UP_AND_DOWN ||
        this.type == laneTypes.LEFT_AND_RIGHT) {
      ctx.strokeStyle = 'black'
      ctx.lineWidth = 2
    } else {
      ctx.strokeStyle = 'grey'
      ctx.lineWidth = 1
    }

    ctx.beginPath()
    if (this.type == laneTypes.LEFT_ONLY ||
        this.type == laneTypes.RIGHT_ONLY ||
        this.type == laneTypes.LEFT_AND_RIGHT) {
      ctx.moveTo(0, this.y)
      ctx.lineTo(width, this.y)
    } else if(this.type === laneTypes.UP_ONLY ||
        this.type === laneTypes.DOWN_ONLY ||
        this.type === laneTypes.UP_AND_DOWN) {
      ctx.moveTo(this.x, 0)
      ctx.lineTo(this.x, height)
    }
    ctx.stroke()
  }
}

class Circle {
  constructor ({
    x,
    y,
    radius,
    velocity,
    color = colors.LIGHT_BLUE,
    direction = directions.RIGHT
  }) {
    this.x = x
    this.y = y
    this.radius = radius
    this.velocity = velocity
    this.color = color
    this.direction = direction
  }

  draw () {
    ctx.fillStyle = this.color
    this._draw(this.x, this.y)

    // Draw circle at the other side if it is close to the edge
    if (this.x < this.radius) {
      this._draw(this.x + width, this.y)
    } else if (width - this.radius < this.x) {
      this._draw(this.x - width, this.y)
    }

    // Draw circle at the other side if it is close to the edge
    if (this.y < this.radius) {
      this._draw(this.x, this.y + height)
    } else if (height - this.radius < this.y) {
      this._draw(this.x, this.y - height)
    }
  }

  _draw (x, y) {
    ctx.beginPath()
    ctx.arc(x, y, this.radius, 0, Math.TWO_PI)
    ctx.fill()
  }

  move (delta) {
    const distance = delta * this.velocity
    if (this.direction === directions.RIGHT) {
      this.right(distance)
    } else if (this.direction === directions.LEFT) {
      this.left(distance)
    } else if (this.direction === directions.DOWN) {
      this.down(distance)
    } else if (this.direction === directions.UP) {
      this.up(distance)
    }
  }

  up (distance) {
    this.y -= distance
    while (this.y < -this.radius) {
      this.y += height
    }
  }

  down (distance) {
    this.y += distance
    while (height + this.radius < this.y) {
      this.y -= height
    }
  }

  left  (distance) {
    this.x -= distance
    while (this.x < -this.radius) {
      this.x += width
    }
  }

  right  (distance) {
    this.x += distance
    while (width + this.radius < this.x) {
      this.x -= width
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
  ctx.fillStyle = '#F5F5F5'
  ctx.fillRect(0, 0, width, height)
}

const requestFrame = () => {
  window.requestAnimationFrame(drawFrame)
}

const intialize = () => {
  refreshCanvas()
  // ctx.translate(0.5, 0.5)

  const randomCircle = ({
    x = random.float({max: width}),
    y = random.float({max: height}),
    direction = random.key(directions)
  }) => {
    const radius = 7
    const velocity = random.float({min: 0.25, max: 0.5})
    const color = random.key(colors)

    return new Circle({x, y, radius, velocity, color, direction})
  }

  for (let x = laneSize; x < width; x += laneSize) {
    const type = random.item(verticalLaneTypes)
    lanes.push(new Lane({x, type}))
    for (let i = 0; i < circlesPerLane; i++) {
      const direction = random.item(allowedDirections[type])
      circles.push(randomCircle({x, direction}))
    }
  }

  for (let y = laneSize; y < height; y += laneSize) {
    const type = random.item(horizontalLaneTypes)
    lanes.push(new Lane({y, type}))
    for (let i = 0; i < circlesPerLane; i++) {
      const direction = random.item(allowedDirections[type])
      circles.push(randomCircle({y, direction}))
    }
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
  lanes.forEach((lane) => lane.draw())
  circles.forEach((circle) => circle.draw())
  requestFrame()
}

intialize()
