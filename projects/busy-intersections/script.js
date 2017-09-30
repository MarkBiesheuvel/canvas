import Car from './classes/car'
import Road from './classes/road'
import Screen from '../../library/screen'
import Direction from '../../library/direction.js'
import Axis from '../../library/axis'
import Random from '../../library/random'
import Settings from './settings'

;(() => {
  const roads = []
  const screen = new Screen({
    backgroundColor: '#F5F5F5'
  })

  for (let x = Settings.roadSpacing; x < screen.width; x += Settings.roadSpacing) {
    roads.push(new Road({
      x: x,
      axis: Axis.vertical,
      isOneWayStreet: Random.bool()
    }))
  }

  for (let y = Settings.roadSpacing; y < screen.height; y += Settings.roadSpacing) {
    roads.push(new Road({
      y: y,
      axis: Axis.horizontal,
      isOneWayStreet: Random.bool()
    }))
  }

  screen.start({
    update: (...args) => {
      Road.all.forEach((road) => road.update(...args))
      Car.all.forEach((car) => car.update(...args))
    },
    draw: (...args) => {
      Road.all.forEach((road) => road.draw(...args))
      Car.all.forEach((car) => car.draw(...args))
    }
  })
})()
