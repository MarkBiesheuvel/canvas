const canvas = document.getElementsByTagName('canvas')[0]
const ctx = canvas.getContext('2d')

let width = null
let height = null

Math.TWO_PI = 2 * Math.PI

const resizeCanvas = () => {
  width = canvas.clientWidth
  height = canvas.clientHeight

  if (width !== canvas.width) {
    canvas.width = width
  }
  if (height !== canvas.height){
    canvas.height = height
  }
}

const drawCircle = (x, y, r = 10, color = 'black') => {
  const path = new Path2D()
  path.arc(x, y, r, 0, Math.TWO_PI)
  ctx.fillStyle = color
  ctx.fill(path)
}

const requestFrame = () => {
  window.requestAnimationFrame(drawFrame)
}

const drawFrame = (timestamp) => {
  resizeCanvas()
  drawCircle(Math.random() * width, Math.random() * height)
  requestFrame()
}

requestFrame()
