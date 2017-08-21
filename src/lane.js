export default class Lane {
  constructor ({
    x = 0,
    y = 0,
    direction = directions.RIGHT
  }) {
    this.x = x
    this.y = y
    this.direction = direction
  }

  draw () {
    if (horizontalDirections.includes(this.direction)) {
      this.drawHorizontalLine(this.y)
    } else if (verticalDirections.includes(this.direction)) {
      this.drawVerticalLine(this.x)
    } else {
      throw Error('Invalid direction')
    }
  }

  drawHorizontalLine (y) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }

  drawVerticalLine (x) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
  }
}
