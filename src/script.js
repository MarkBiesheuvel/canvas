import Car from './car'
import Lane from './lane'
import Road from './road'
import Screen from './screen'
import Direction from './utils/direction.js'
import Axis from './utils/axis'
import Random from './utils/random'
import Settings from './settings'

;(() => {
  const cars = []
  const roads = []

  const screen = new Screen({
    backgroundColor: '#F5F5F5'
  })

  {
    const axis = Axis.vertical
    const directions = Direction.getDirectionsForAxis(axis)
    for (let x = Settings.roadSpacing; x < screen.width; x += Settings.roadSpacing) {
      const road = new Road({x, axis})
      const velocity = Random.float(Settings.velocity)
      road.lanes.forEach((lane) => {
        // TODO: let cars spawn in on the side of the screen and let them disapear when they get to the other side
        for (let y = 0; y < screen.height; y += Random.float(Settings.startingDistance)) {
          const color = Random.item(Settings.colors)
          cars.push(new Car({x: lane.x, y, radius: Settings.radius, velocity, color, direction: lane.direction}))
        }
      })
      roads.push(road)
    }
  }

  {
    const axis = Axis.horizontal
    const directions = Direction.getDirectionsForAxis(axis)
    for (let y = Settings.roadSpacing; y < screen.height; y += Settings.roadSpacing) {
      const road = new Road({y, axis})
      const velocity = Random.float(Settings.velocity)
      road.lanes.forEach((lane) => {
        for (let x = 0; x < screen.width; x += Random.float(Settings.startingDistance)) {
          const color = Random.item(Settings.colors)
          cars.push(new Car({x, y: lane.y, radius: Settings.radius, velocity, color, direction: lane.direction}))
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
