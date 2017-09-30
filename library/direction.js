import Axis from './axis'

export default class Direction {
  static get up() {
    return 0x01
  }
  static get down() {
    return 0x02
  }
  static get left() {
    return 0x03
  }
  static get right() {
    return 0x04
  }
  static getDirectionsForAxis(axis) {
    if (axis === Axis.horizontal) {
      return [this.right, this.left]
    } else if (axis == Axis.vertical) {
      return [this.up, this.down]
    } else {
      throw Error(`Invalid axis: ${axis}`)
    }
  }
}
