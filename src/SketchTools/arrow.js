/*eslint no-unused-vars: 0*/

import FabricCanvasTool from './fabrictool'

const fabric = require('fabric').fabric

class Arrow extends FabricCanvasTool {
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
      originX: 'center',
      originY: 'center',
      selectable: false,
      evented: false,
    })
    
    const visibleArrowHeadModifier = 6 - this._width >0?6 -this._width:0
    this.head = new fabric.Triangle({
      fill: this._color,
      left: pointer.x,
      top: pointer.y,
      originX: 'center',
      originY: 'center',
      height: 3 * this._width + visibleArrowHeadModifier,
      width: 3 * this._width + visibleArrowHeadModifier ,
      selectable: false,
      evented: false,
      angle: 90,
    })
    canvas.add(this.line)
    canvas.add(this.head)
  }

  doMouseMove(o) {
    if (!this.isDown) return
    const canvas = this._canvas
    const pointer = canvas.getPointer(o.e)
    this.line.set({ x2: pointer.x, y2: pointer.y })
    this.line.setCoords()

    const x_delta = pointer.x - this.line.x1
    const y_delta = pointer.y - this.line.y1

    this.head.set({
      left: pointer.x,
      top: pointer.y,
      angle: 90 + (Math.atan2(y_delta, x_delta) * 180) / Math.PI,
    })

    canvas.renderAll()
  }

  doMouseUp(o) {
    this.isDown = false
    const canvas = this._canvas

    canvas.remove(this.line)
    canvas.remove(this.head)
    const arrow = new fabric.Group([this.line, this.head])
    arrow.selectable = arrow.evented = false
    arrow.selection = false
    canvas.add(arrow)
  }

  doMouseOut(o) {
    this.isDown = false
  }
}

export default Arrow
