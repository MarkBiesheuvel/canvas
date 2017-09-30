import Direction from '../../../library/direction'

export default class Car {
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
  }

  draw ({ctx, width, height}) {
    ctx.fillStyle = this.color
    this.drawCircle(ctx, this.x, this.y)

    // Draw circle at the other side if it is close to the edge
    if (this.x < this.radius) {
      this.drawCircle(ctx, this.x + width, this.y)
    } else if (width - this.radius < this.x) {
      this.drawCircle(ctx, this.x - width, this.y)
    }

    // Draw circle at the other side if it is close to the edge
    if (this.y < this.radius) {
      this.drawCircle(ctx, this.x, this.y + height)
    } else if (height - this.radius < this.y) {
      this.drawCircle(ctx, this.x, this.y - height)
    }
  }

  drawCircle (ctx, x, y) {
    ctx.beginPath()
    ctx.arc(x, y, this.radius, 0, 2 * Math.PI)
    ctx.fill()
  }

  intersectsWithAnyCar (cars = []) {
    return cars.reduce((accumulator, car) => {
      // Short cut when accumulator is already true
      //  and when checking intersecting with current car
      if (accumulator || this == car) {
        return accumulator
      }
      return this.intersectsWithSingleCar(this, car)
    }, false)
  }

  intersectsWithSingleCar (a = {x, y, radius}, b = {x, y, radius}) {
    // Use rectanglur bounding box around circlular car
    // TODO: soft bounding box vs hard bounding box
    return (a.x - a.radius) < (b.x + b.radius) &&
      (a.x + a.radius) > (b.x - b.radius) &&
      (a.y - a.radius) < (b.y + b.radius) &&
      (a.y + a.radius) > (b.y - b.radius)
  }

  move ({ctx, width, height}, delta, cars = []) {
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
      this.moveUp(distance, height, cars)
    }

    if (this.intersectsWithAnyCar(cars)) {
      // TODO: deaccalerate when intersecting with soft bounding box
      // stop and mark as crashed when intersecting with hard bounding box
      this.x = backup.x
      this.y = backup.y
    }
  }

  moveUp (distance, height, cars) {
    this.y -= distance
    while (this.y < -this.radius) {
      this.y += height
    }
  }

  moveDown (distance, height) {
    this.y += distance
    while (height + this.radius < this.y) {
      this.y -= height
    }
  }

  moveLeft (distance, width) {
    this.x -= distance
    while (this.x < -this.radius) {
      this.x += width
    }
  }

  moveRight (distance, width) {
    this.x += distance
    while (width + this.radius < this.x) {
      this.x -= width
    }
  }
}
