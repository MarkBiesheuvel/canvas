import Direction from '../../../library/direction'
import Axis from '../../../library/axis'
import Random from '../../../library/random'
import Settings from '../settings'
import Lane from './lane'

const all = []

export default class Road {

  static get all() {
    return all
  }

  constructor ({
    x = 0,
    y = 0,
    isOneWayStreet = true,
    axis
  }) {
    this.x = x
    this.y = y

    this.lanes = []
    if (isOneWayStreet) {
      // One-way street
      this.lanes.push(new Lane({x, y, axis, direction: Random.item(Direction.getDirectionsForAxis(axis))}))
    } else {
      // Two-way street
      if (axis === Axis.vertical) {
        this.lanes.push(new Lane({x: x - Settings.laneSpacing, axis, direction: Direction.down}))
        this.lanes.push(new Lane({x: x + Settings.laneSpacing, axis, direction: Direction.up}))
      } else if (axis === Axis.horizontal) {
        this.lanes.push(new Lane({y: y - Settings.laneSpacing, axis, direction: Direction.left}))
        this.lanes.push(new Lane({y: y + Settings.laneSpacing, axis, direction: Direction.right}))
      } else {
        throw Error(`Invalid axis: ${axis}`)
      }
    }

    all.push(this)
  }

  update (...args) {
    this.lanes.forEach((lane) => lane.update(...args))
  }

  draw (...args) {
    this.lanes.forEach((lane) => lane.draw(...args))
  }
}
