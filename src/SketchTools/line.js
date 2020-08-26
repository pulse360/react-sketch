/*eslint no-unused-vars: 0*/

import FabricCanvasTool from './fabrictool'

const fabric = require('fabric').fabric

class Line extends FabricCanvasTool {
  configureCanvas(props) {
    const canvas = this._canvas
    canvas.isDrawingMode = canvas.selection = false
    canvas.forEachObject((o) => (o.selectable = o.evented = false))
    this._width = props.lineWidth
    this._color = props.lineColor
  }

  doMouseDown(o) {
    this.isDown = true
    const canvas = this._canvas
    const pointer = canvas.getPointer(o.e)
    const points = [pointer.x, pointer.y, pointer.x, pointer.y]
    this.line = new fabric.Line(points, {
      strokeWidth: this._width,
      fill: this._color,
      stroke: this._color,
      selectable: false,
      evented: false,
    })
    canvas.add(this.line)
  }

  doMouseMove(o) {
    if (!this.isDown) return
    const canvas = this._canvas
    const pointer = canvas.getPointer(o.e)
    this.line.set({ x2: pointer.x, y2: pointer.y })
    this.line.setCoords()
    canvas.renderAll()
  }

  doMouseUp(o) {
    this.isDown = false
  }

  doMouseOut(o) {
    this.isDown = false
  }
}

export default Line
