import FabricCanvasTool from './fabrictool'
import hexToRgba from 'hex-to-rgba'

class Highlighter extends FabricCanvasTool {
  configureCanvas(props) {
    const rgbaColor = hexToRgba(props.lineColor)
    const reg = rgbaColor.replace('1)', '0.5)')

    this._canvas.isDrawingMode = true
    this._canvas.freeDrawingBrush.width = props.lineWidth
    this._canvas.freeDrawingBrush.color = reg
  }
}

export default Highlighter
