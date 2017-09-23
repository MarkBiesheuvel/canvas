import {Axis, Direction, Random} from './util'
import Settings from './settings'
import Lane from './lane'

export default class Road {
  constructor ({
    x = 0,
    y = 0,
    axis
  }) {
    this.x = x
    this.y = y

    this.lanes = []
    if (Random.bool()) {
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
  }

  draw (screen) {
    this.lanes.forEach((lane) => lane.draw(screen))
  }
}
