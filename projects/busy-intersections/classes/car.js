import Direction from '../../../library/direction'

const all = new Set()

export default class Car {

  static get all() {
    return all
  }

  constructor ({
    x,
    y,
    radius,
    velocity,
    color,
    direction
  }) {
    this.x = x
    this.y = y
    this.radius = radius
    this.velocity = velocity
    this.color = color
    this.direction = direction

    all.add(this)
  }

  draw ({ctx, width, height}) {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    ctx.fill()
  }

  intersectsWithAnyCar () {
    for (let car of all) {
      if (this !== car && this.intersectsWithSingleCar(this, car)) {
        return true
      }
    }
    return false
  }

  intersectsWithSingleCar (a = {x, y, radius}, b = {x, y, radius}) {
    // Use rectanglur bounding box around circlular car
    // TODO: soft bounding box vs hard bounding box
    return (a.x - a.radius) < (b.x + b.radius) &&
      (a.x + a.radius) > (b.x - b.radius) &&
      (a.y - a.radius) < (b.y + b.radius) &&
      (a.y + a.radius) > (b.y - b.radius)
  }

  update ({ctx, width, height}, delta) {
    const distance = delta * this.velocity

    // Keep a backup of the old Y position in case we need to back up
    const backup = {
      x: this.x,
      y: this.y
    }

    if (this.direction === Direction.right) {
      this.moveRight(distance, width)
    } else if (this.direction === Direction.left) {
      this.moveLeft(distance, width)
    } else if (this.direction === Direction.down) {
      this.moveDown(distance, height)
    } else if (this.direction === Direction.up) {
      this.moveUp(distance, height)
    }

    if (this.intersectsWithAnyCar(all)) {
      // TODO: deaccalerate when intersecting with soft bounding box
      // stop and mark as crashed when intersecting with hard bounding box
      this.x = backup.x
      this.y = backup.y
    }
  }

  moveUp (distance, height) {
    this.y -= distance
    if (this.y < -this.radius) {
      all.delete(this)
    }
  }

  moveDown (distance, height) {
    this.y += distance
    if (height + this.radius < this.y) {
      all.delete(this)
    }
  }

  moveLeft (distance, width) {
    this.x -= distance
    if (this.x < -this.radius) {
      all.delete(this)
    }
  }

  moveRight (distance, width) {
    this.x += distance
    if (width + this.radius < this.x) {
      all.delete(this)
    }
  }
}
