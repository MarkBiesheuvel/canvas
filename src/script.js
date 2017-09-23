import Car from './car'
import Lane from './lane'
import Road from './road'
import Screen from './screen'
import {Direction, Axis, Random} from './util'

;(() => {
  const carsPerLane = 5
  const laneSize = 250
  const cars = []
  const roads = []

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
      const road = new Road({x, axis})
      road.lanes.forEach((lane) => {
        for (let i = 0; i < carsPerLane; i++) {
          const radius = 7
          const velocity = Random.float({min: 0.25, max: 0.3})
          const color = Random.item(colors)
          const y = Random.float({max: screen.height})
          cars.push(new Car({x: lane.x, y, radius, velocity, color, direction: lane.direction}))
        }
      })
      roads.push(road)
    }
  }

  {
    const axis = Axis.horizontal
    const directions = Direction.getDirectionsForAxis(axis)
    for (let y = laneSize; y < screen.height; y += laneSize) {
      const road = new Road({y, axis})
      road.lanes.forEach((lane) => {
        for (let i = 0; i < carsPerLane; i++) {
          const radius = 7
          const velocity = Random.float({min: 0.25, max: 0.3})
          const color = Random.item(colors)
          const x = Random.float({max: screen.width})
          cars.push(new Car({x, y: lane.y, radius, velocity, color, direction: lane.direction}))
        }
      })
      roads.push(road)
    }
  }

  screen.start({
    update: (screen, delta) => {
      cars.forEach((car) => car.move(screen, delta, cars))
    },
    draw: (screen) => {
      roads.forEach((road) => road.draw(screen))
      cars.forEach((car) => car.draw(screen))
    }
  })
})()
