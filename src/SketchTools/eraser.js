import FabricCanvasTool from './fabrictool'

class Eraser extends FabricCanvasTool {
  configureCanvas() {
    let canvas = this._canvas
    canvas.isDrawingMode = false
    canvas.selection = false
    canvas.forEachObject((o) => {
      o.selectable = false
      o.evented = true
      o.hoverCursor = 'default'
    })
  }

  doMouseDown() {
    this.isDown = true
  }

  doMouseMove(o) {
    if (!this.isDown) return
    let canvas = this._canvas
    canvas.remove(o.target)
  }

  doMouseUp() {
    this.isDown = false
  }

  doMouseOut() {
    this.isDown = false
  }
}

export default Eraser
