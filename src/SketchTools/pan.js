/*eslint no-unused-vars: 0*/

import FabricCanvasTool from './fabrictool'

class Pan extends FabricCanvasTool {

  configureCanvas(props) {
    const canvas = this._canvas;
    canvas.isDrawingMode = canvas.selection = false
    canvas.forEachObject((o) => o.selectable = o.evented = false)
    //Change the cursor to the move grabber
    canvas.defaultCursor = 'move';
  }

  doMouseDown(o) {
    const canvas = this._canvas;
    this.isDown = true;
    const pointer = canvas.getPointer(o.e)
    this.startX = pointer.x;
    this.startY = pointer.y;
  }

  doMouseMove(o) {
    if (!this.isDown) return;
    const canvas = this._canvas;
    const pointer = canvas.getPointer(o.e)

    canvas.relativePan({
      x: pointer.x - this.startX,
      y: pointer.y - this.startY
    });
    canvas.renderAll();
  }

  doMouseUp(o) {
    this.isDown = false;
  }

}

export default Pan;