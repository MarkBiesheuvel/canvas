import Car from './car'
import Lane from './lane'
import Screen from './screen'
import {Direction, Axis, Random} from './util'

;(() => {
  const carsPerLane = 5
  const laneSize = 250
  const cars = []
  const lanes = []

  // Colors chosen from material.io color palettes
  // https://material.io/guidelines/style/color.html#color-color-tool
  const colors = ['#F44336', '#FF9800', '#03A9F4', '#8BC34A', '#673AB7']

  const screen = new Screen({
    backgroundColor: '#F5F5F5'
  })

  {
    const axis = Axis.vertical
    const directions = Direction.getDirectionsForAxis(axis)
    for (let x = laneSize; x < screen.width; x += laneSize) {
      const direction = Random.item(directions)
      lanes.push(new Lane({x, axis}))
      for (let i = 0; i < carsPerLane; i++) {
        const radius = 7
        const velocity = Random.float({min: 0.25, max: 0.5})
        const color = Random.item(colors)
        const y = Random.float({max: screen.height})
        cars.push(new Car({x, y, radius, velocity, color, direction}))
      }
    }
  }

  {
    const axis = Axis.horizontal
    const directions = Direction.getDirectionsForAxis(axis)
    for (let y = laneSize; y < screen.height; y += laneSize) {
      const direction = Random.item(directions)
      lanes.push(new Lane({y, axis}))
      for (let i = 0; i < carsPerLane; i++) {
        const radius = 7
        const velocity = Random.float({min: 0.25, max: 0.5})
        const color = Random.item(colors)
        const x = Random.float({max: screen.width})
        cars.push(new Car({x, y, radius, velocity, color, direction}))
      }
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
