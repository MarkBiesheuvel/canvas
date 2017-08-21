export default class Car {
  constructor ({
    x,
    y,
    radius,
    velocity,
    color = colors.LIGHT_BLUE,
    direction = directions.RIGHT
  }) {
    this.x = x
    this.y = y
    this.radius = radius
    this.velocity = velocity
    this.color = color
    this.direction = direction
  }

  draw () {
    ctx.fillStyle = this.color
    this.drawCircle(this.x, this.y)

    // Draw circle at the other side if it is close to the edge
    if (this.x < this.radius) {
      this.drawCircle(this.x + width, this.y)
    } else if (width - this.radius < this.x) {
      this.drawCircle(this.x - width, this.y)
    }

    // Draw circle at the other side if it is close to the edge
    if (this.y < this.radius) {
      this.drawCircle(this.x, this.y + height)
    } else if (height - this.radius < this.y) {
      this.drawCircle(this.x, this.y - height)
    }
  }

  drawCircle (x, y) {
    ctx.beginPath()
    ctx.arc(x, y, this.radius, 0, Math.TWO_PI)
    ctx.fill()
  }

  move (delta) {
    const distance = delta * this.velocity
    if (this.direction === directions.RIGHT) {
      this.moveRight(distance)
    } else if (this.direction === directions.LEFT) {
      this.moveLeft(distance)
    } else if (this.direction === directions.DOWN) {
      this.moveDown(distance)
    } else if (this.direction === directions.UP) {
      this.moveUp(distance)
    }
  }

  moveUp (distance) {
    this.y -= distance
    while (this.y < -this.radius) {
      this.y += height
    }
  }

  moveDown (distance) {
    this.y += distance
    while (height + this.radius < this.y) {
      this.y -= height
    }
  }

  moveLeft  (distance) {
    this.x -= distance
    while (this.x < -this.radius) {
      this.x += width
    }
  }

  moveRight  (distance) {
    this.x += distance
    while (width + this.radius < this.x) {
      this.x -= width
    }
  }
}
