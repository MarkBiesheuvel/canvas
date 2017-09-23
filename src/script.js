import Car from './car'
import Lane from './lane'
import Road from './road'
import Screen from './screen'
import {Direction, Axis, Random} from './util'

;(() => {
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
    const radius = 7
    for (let x = laneSize; x < screen.width; x += laneSize) {
      const road = new Road({x, axis})
      const velocity = Random.float({min: 0.15, max: 0.3})
      road.lanes.forEach((lane) => {
        for (let y = 0; y < screen.height; y += Random.float({min: 100, max: 300})) {
          const color = Random.item(colors)
          cars.push(new Car({x: lane.x, y, radius, velocity, color, direction: lane.direction}))
        }
      })
      roads.push(road)
    }
  }

  {
    const axis = Axis.horizontal
    const directions = Direction.getDirectionsForAxis(axis)
    const radius = 7
    for (let y = laneSize; y < screen.height; y += laneSize) {
      const road = new Road({y, axis})
      const velocity = Random.float({min: 0.15, max: 0.3})
      road.lanes.forEach((lane) => {
        for (let x = 0; x < screen.width; x += Random.float({min: 100, max: 300})) {
          const color = Random.item(colors)
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
