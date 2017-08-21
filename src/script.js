import Car from './car'
import Lane from './lane'
import Screen from './screen'
import {horizontalDirections, verticalDirections} from './directions'
import random from './random'
import colors from './colors'

Math.TWO_PI = 2 * Math.PI

;(() => {
  const carsPerLane = 5
  const laneSize = 250
  const cars = []
  const lanes = []

  const screen = new Screen({
    backgroundColor: '#F5F5F5'
  })

  for (let x = laneSize; x < screen.width; x += laneSize) {
    const direction = random.item(verticalDirections)
    lanes.push(new Lane({x, direction}))
    for (let i = 0; i < carsPerLane; i++) {
      const radius = 7
      const velocity = random.float({min: 0.25, max: 0.5})
      const color = random.key(colors)
      const y = random.float({max: screen.height})
      cars.push(new Car({x, y, radius, velocity, color, direction}))
    }
  }

  for (let y = laneSize; y < screen.height; y += laneSize) {
    const direction = random.item(horizontalDirections)
    lanes.push(new Lane({y, direction}))
    for (let i = 0; i < carsPerLane; i++) {
      const radius = 7
      const velocity = random.float({min: 0.25, max: 0.5})
      const color = random.key(colors)
      const x = random.float({max: screen.width})
      cars.push(new Car({x, y, radius, velocity, color, direction}))
    }
  }

  screen.start({
    update: (screen, delta) => {
      cars.forEach((car) => car.move(screen, delta))
    },
    draw: (screen) => {
      lanes.forEach((lane) => lane.draw(screen))
      cars.forEach((car) => car.draw(screen))
    }
  })
})()
