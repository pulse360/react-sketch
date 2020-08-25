import FabricCanvasTool from './fabrictool'

class Eraser extends FabricCanvasTool {
  configureCanvas() {
    const canvas = this._canvas
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
    const canvas = this._canvas
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
