import Car from './car'
import Lane from './lane'

Math.TWO_PI = 2 * Math.PI

const carsPerLane = 5
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

const verticalDirections = [
  directions.UP,
  directions.DOWN
]

const horizontalDirections = [
  directions.LEFT,
  directions.RIGHT
]

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

const cars = []
const lanes = []
let width = null
let height = null
let previousTimestamp = null

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

  const randomCar = ({
    x = random.float({max: width}),
    y = random.float({max: height}),
    direction = random.key(directions)
  }) => {
    const radius = 7
    const velocity = random.float({min: 0.25, max: 0.5})
    const color = random.key(colors)

    return new Car({x, y, radius, velocity, color, direction})
  }

  for (let x = laneSize; x < width; x += laneSize) {
    const direction = random.item(verticalDirections)
    lanes.push(new Lane({x, direction}))
    for (let i = 0; i < carsPerLane; i++) {
      cars.push(randomCar({x, direction}))
    }
  }

  for (let y = laneSize; y < height; y += laneSize) {
    const direction = random.item(horizontalDirections)
    lanes.push(new Lane({y, direction}))
    for (let i = 0; i < carsPerLane; i++) {
      cars.push(randomCar({y, direction}))
    }
  }

  requestFrame()
}

const drawFrame = (timestamp) => {
  // Calculate delta and set previous timestamp for next frame
  const delta = (previousTimestamp === null) ? 0 : (timestamp - previousTimestamp)
  previousTimestamp = timestamp

  // Move all objects
  cars.forEach((car) => car.move(delta))

  // Only take the drawing hit after everything is updated
  refreshCanvas()
  lanes.forEach((lane) => lane.draw())
  cars.forEach((car) => car.draw())
  requestFrame()
}

intialize()
