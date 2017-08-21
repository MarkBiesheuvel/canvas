import {Direction, Axis} from './util'

export default class Lane {
  constructor ({
    x = 0,
    y = 0,
    axis
  }) {
    this.x = x
    this.y = y
    this.axis = axis
  }

  draw ({ctx, width, height}) {
    if (this.axis === Axis.horizontal) {
      this.drawHorizontalLine(ctx, this.y, width)
    } else if (this.axis === Axis.vertical) {
      this.drawVerticalLine(ctx, this.x, height)
    } else {
      throw Error(`Invalid axis: ${axis}`)
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
