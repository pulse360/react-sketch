/*eslint no-unused-vars: 0*/

import FabricCanvasTool from './fabrictool'

const fabric = require('fabric').fabric

class Text extends FabricCanvasTool {
  configureCanvas(props) {
    let canvas = this._canvas
    canvas.isDrawingMode = false
    canvas.forEachObject((o) => (o.selectable = o.evented = false))

    // canvas.selectionColor = 'rgba(0,0,0,0.3)'
    // canvas.selectionBorderColor = 'red'
    // canvas.selectionLineWidth = 1

    this._width = props.lineWidth
    this._color = props.lineColor
    this._fill = props.fillColor
    this.selectTool = props.selectTool
  }

  doMouseDown(o) {
    let canvas = this._canvas
    let pointer = canvas.getPointer(o.e)
    this.startX = pointer.x
    this.startY = pointer.y
  }

  doMouseMove(o) {}

  doMouseUp(o) {
    let canvas = this._canvas
    let pointer = canvas.getPointer(o.e)
    let endX = pointer.x

    const clickWithoutMove = Boolean(endX >= this.startX + 50)

    if (clickWithoutMove) {
      let opts = {
        left: this.startX,
        top: this.startY,
        fontSize: 18,
        maxWidth: endX - this.startX,
        width: endX - this.startX,
        splitByGrapheme: true,
        fontFamily: 'sans-serif',
        borderColor: 'grey',
        cornerColor: 'black',
        cornerSize: 10,
        transparentCorners: true,
        lineHeight: 1.25,
      }

      let text = new fabric.Textbox('', opts)
      this.textBox = text

      canvas.add(text)
      canvas.setActiveObject(text)
      text.enterEditing()
      text.hiddenTextarea.focus()

      text.on('deselected', () => {
        if (!text.text.length) {
          canvas.remove(text)
        }
      })
    }

    if (this.textBox && this.textBox.text.length && !clickWithoutMove) {
      this.selectTool()
    }
  }

  doMouseOut(event) {
    // let canvas = this._canvas
    // canvas.forEachObject((object) => {
    //   object.selectable = false
    //   object.evented = false
    // })
  }
}

export default Text
