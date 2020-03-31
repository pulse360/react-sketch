/* eslint no-unused-vars: 0 */

/**
 * "Abstract" like base class for a Canvas tool
 */
class FabricCanvasTool {
  constructor(canvas) {
    this._canvas = canvas;
  }

  configureCanvas(props) {

  }

  doMouseUp(event) {
    console.log('Abstract class up', event)
  }

  doMouseDown(event) {
    console.log('Abstract class down', event)
  }

  doMouseMove(event) {
    console.log('Abstract class move', event)
  }

  doMouseOut(event) {
    console.log('Abstract class out', event)
  }
}

export default FabricCanvasTool;