import FabricCanvasTool from './fabrictool'

class Eraser extends FabricCanvasTool {
  configureCanvas(props) {
    let canvas = this._canvas
    canvas.isDrawingMode = false
    canvas.selection = false
    canvas.forEachObject((o) => {
      o.selectable = false
      o.evented = true
      o.hoverCursor = 'default'
    })
  }

  doMouseDown(o) {
    this.isDown = true
  }

  doMouseMove(o) {
    if (!this.isDown) return
    let canvas = this._canvas
    canvas.remove(o.target)
  }

  doMouseUp(o) {
    this.isDown = false
  }

  doMouseOut(o) {
    this.isDown = false
  }
}

export default Eraser
