/*eslint no-unused-vars: 0*/

import FabricCanvasTool from './fabrictool'

const fabric = require('fabric').fabric

class Text extends FabricCanvasTool {
  configureCanvas(props) {
    let canvas = this._canvas
    canvas.isDrawingMode = canvas.selection = false
    canvas.forEachObject((o) => (o.selectable = o.evented = false))
    this._width = props.lineWidth
    this._color = props.lineColor
    this._fill = props.fillColor
  }

  doMouseDown(o) {
    let canvas = this._canvas
    // this.isDown = true
    let pointer = canvas.getPointer(o.e)
    let startX = pointer.x
    let startY = pointer.y
    let opts = {
      left: startX,
      top: startY,
      fontSize: 18,
    }
    let text = new fabric.IText('', opts)
    canvas.add(text)
    canvas.setActiveObject(text)
    text.enterEditing()
    text.hiddenTextarea.focus()
  }

  doMouseMove(o) {
    // if (!this.isDown) return
    // let canvas = this._canvas
    // let pointer = canvas.getPointer(o.e)
    // if (this.startX > pointer.x) {
    //   this.rect.set({ left: Math.abs(pointer.x) })
    // }
    // if (this.startY > pointer.y) {
    //   this.rect.set({ top: Math.abs(pointer.y) })
    // }
    // this.rect.set({ width: Math.abs(this.startX - pointer.x) })
    // this.rect.set({ height: Math.abs(this.startY - pointer.y) })
    // this.rect.setCoords()
    // canvas.renderAll()
  }

  doMouseUp(o) {
    // this.isDown = false
  }
}

export default Text
