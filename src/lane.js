import {horizontalDirections, verticalDirections} from './directions'

export default class Lane {
  constructor ({
    x = 0,
    y = 0,
    direction
  }) {
    this.x = x
    this.y = y
    this.direction = direction
  }

  draw ({ctx, width, height}) {
    if (horizontalDirections.includes(this.direction)) {
      this.drawHorizontalLine(ctx, this.y, width)
    } else if (verticalDirections.includes(this.direction)) {
      this.drawVerticalLine(ctx, this.x, height)
    } else {
      throw Error('Invalid direction')
    }
  }

  drawHorizontalLine (ctx, y, width) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }

  drawVerticalLine (ctx, x, height) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
  }
}
