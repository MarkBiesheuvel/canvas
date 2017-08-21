class Direction {
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

class Axis {
  static get horizontal() {
    return 0x08
  }
  static get vertical() {
    return 0x09
  }
}

class Random {
  static float ({min = 0, max = 1} = {}) {
    return (min + Math.random() * (max - min))
  }
  static bool () {
    return this.float() < 0.5
  }
  static int (options = {}) {
    return Math.floor(this.float(options))
  }
  static item (array) {
    return array[this.int({max: array.length})]
  }
  static key (object) {
    return object[this.item(Object.keys(object))]
  }
}

export {Direction, Axis, Random}
