export default class Screen {
  constructor ({backgroundColor = 'white'} = {}) {
    this.canvas = document.getElementsByTagName('canvas')[0]
    this.ctx = this.canvas.getContext('2d')
    this.previousTimestamp = null
    this.backgroundColor = backgroundColor
    this.clientPixelRatio = window.devicePixelRatio

    // Calculate the width/height and create all the objects
    this.resize()

    // Offset the canvas half a pixel so lines are more crisp
    this.ctx.translate(0.5, 0.5)
  }

  resize () {
    // Get height and width of the canvas on the client screen
    this.width = this.clientPixelRatio * this.canvas.clientWidth
    this.height = this.clientPixelRatio * this.canvas.clientHeight

    // Update the height and width of the drawing space of the client
    // This is to avoid scaling (shrinking down or scaling up of the canvas)
    if (this.width !== this.canvas.width) {
      this.canvas.width = this.width
    }
    if (this.height !== this.canvas.height) {
      this.canvas.height = this.height
    }

  }

  clear () {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.ctx.fillStyle = this.backgroundColor
    this.ctx.fillRect(0, 0, this.width, this.height)
  }

  start ({
    update = () => {},
    draw = () => {}
  }) {
    this.update = update
    this.draw = draw
    this.requestFrame()
  }

  requestFrame () {
    window.requestAnimationFrame((timestamp) => {
      this.frame(timestamp)
    })
  }

  write (text) {
    this.ctx.fillStyle = 'black'
    this.ctx.fillText(text, 2, 8)
  }

  frame (timestamp) {
    // Calculate delta and set previous timestamp for next frame
    const delta = (this.previousTimestamp === null) ? 0 : (timestamp - this.previousTimestamp)
    this.previousTimestamp = timestamp

    const fps = delta ? Math.round(1000 / delta) : 0

    // Calculate new position of all the objects
    this.resize()
    this.update(this, delta)

    // Draw all the objects
    this.clear()
    this.write(`${fps} fps`)
    this.draw(this)

    // Start the loop (again)
    this.requestFrame()
  }
}
