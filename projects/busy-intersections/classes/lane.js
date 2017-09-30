import Direction from '../../../library/direction'
import Axis from '../../../library/axis'
import Random from '../../../library/random'
import Car from './car'
import Settings from '../settings'

export default class Lane {
  constructor ({
    x = 0,
    y = 0,
    axis,
    direction
  }) {
    this.x = x
    this.y = y
    this.axis = axis
    this.direction = direction
    this.nextSpawnTimestamp = null
  }

  update({width, height}, delta, timestamp) {
    if (this.nextSpawnTimestamp === null) {
      this.nextSpawnTimestamp = timestamp + Random.float(Settings.spawnInterval)
    }

    if (timestamp > this.nextSpawnTimestamp) {

      let x, y
      const radius = Settings.radius

      if (this.direction === Direction.right) {
        x = -radius
        y = this.y
      } else if (this.direction === Direction.left) {
        x = width + radius
        y = this.y
      } else if (this.direction === Direction.down) {
        x = this.x
        y = -radius
      } else if (this.direction === Direction.up) {
        x = this.x
        y = height + radius
      }

      new Car({x, y, radius,
        velocity: Random.float(Settings.velocity),
        color: Random.item(Settings.colors),
        direction: this.direction
      })

      this.nextSpawnTimestamp = timestamp + Random.float(Settings.spawnInterval)
    }
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
