import FabricCanvasTool from './fabrictool'

class Eraser extends FabricCanvasTool {
  configureCanvas(props) {
    this._canvas.isDrawingMode = true
    this._canvas.freeDrawingBrush.width = props.lineWidth
    this._canvas.freeDrawingBrush.color = 'rgba(0, 0, 0, 0)'
  }
}

export default Eraser
