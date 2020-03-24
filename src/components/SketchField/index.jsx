import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import History from '../SketchTools/history'
import { uuid4 } from '../../utils'
import Select from '../SketchTools/select'
import Pencil from '../SketchTools/pencil'
import Line from '../SketchTools/line'
import Arrow from '../SketchTools/arrow'
import Rectangle from '../SketchTools/rectangle'
import Circle from '../SketchTools/circle'
import Pan from '../SketchTools/pan'
import Tool from '../Tools'
import Eraser from '../SketchTools/eraser'
import Highlighter from '../SketchTools/highlighter'

const fabric = require('fabric').fabric

class SketchField extends PureComponent {
  static propTypes = {
    lineColor: PropTypes.string,
    lineWidth: PropTypes.number,
    fillColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    opacity: PropTypes.number,
    undoSteps: PropTypes.number,
    tool: PropTypes.string,
    imageFormat: PropTypes.string,
    value: PropTypes.object,
    forceValue: PropTypes.bool,
    widthCorrection: PropTypes.number,
    heightCorrection: PropTypes.number,
    onChange: PropTypes.func,
    defaultValue: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    className: PropTypes.string,
    style: PropTypes.object,
  }

  static defaultProps = {
    lineColor: 'black',
    lineWidth: 10,
    fillColor: 'transparent',
    backgroundColor: 'transparent',
    opacity: 1.0,
    undoSteps: 25,
    tool: Tool.Pencil,
    widthCorrection: 2,
    heightCorrection: 0,
    forceValue: false,
  }

  state = {
    parentWidth: 550,
    action: true,
  }

  _initTools = (fabricCanvas) => {
    this._tools = {}
    this._tools[Tool.Select] = new Select(fabricCanvas)
    this._tools[Tool.Pencil] = new Pencil(fabricCanvas)
    this._tools[Tool.Line] = new Line(fabricCanvas)
    this._tools[Tool.Arrow] = new Arrow(fabricCanvas)
    this._tools[Tool.Rectangle] = new Rectangle(fabricCanvas)
    this._tools[Tool.Circle] = new Circle(fabricCanvas)
    this._tools[Tool.Pan] = new Pan(fabricCanvas)
    this._tools[Tool.Eraser] = new Eraser(fabricCanvas)
    this._tools[Tool.Highlighter] = new Highlighter(fabricCanvas)
    this._tools[Tool.Eraser] = new Eraser(fabricCanvas)
  }

  enableTouchScroll = () => {
    let canvas = this._fc
    if (canvas.allowTouchScrolling) return
    canvas.allowTouchScrolling = true
  }

  disableTouchScroll = () => {
    let canvas = this._fc
    if (canvas.allowTouchScrolling) {
      canvas.allowTouchScrolling = false
    }
  }

  addImg = (dataUrl, options = {}) => {
    let canvas = this._fc
    fabric.Image.fromURL(dataUrl, (oImg) => {
      let opts = {
        left: Math.random() * (canvas.getWidth() - oImg.width * 0.5),
        top: Math.random() * (canvas.getHeight() - oImg.height * 0.5),
        scale: 0.5,
      }
      Object.assign(opts, options)
      oImg.scale(opts.scale)
      oImg.set({
        left: opts.left,
        top: opts.top,
      })
      canvas.add(oImg)
    })
  }

  _onObjectAdded = (e) => {
    if (!this.state.action) {
      this.setState({ action: true })
      return
    }
    let obj = e.target
    obj.__version = 1
    let objState = obj.toJSON()
    obj.__originalState = objState
    let state = JSON.stringify(objState)
    this._history.keep([obj, state, state])
  }

  _onObjectMoving = (e) => {}

  _onObjectScaling = (e) => {}

  _onObjectRotating = (e) => {}

  _onObjectModified = (e) => {
    let obj = e.target
    obj.__version += 1
    let prevState = JSON.stringify(obj.__originalState)
    let objState = obj.toJSON()
    obj.__originalState = objState
    let currState = JSON.stringify(objState)
    this._history.keep([obj, prevState, currState])
  }

  _onObjectRemoved = (e) => {
    let obj = e.target
    if (obj.__removed) {
      obj.__version += 1
      return
    }
    obj.__version = 0
  }

  _onMouseDown = (e) => {
    this._selectedTool.doMouseDown(e)
  }

  _onMouseMove = (e) => {
    this._selectedTool.doMouseMove(e)
  }

  _onMouseOut = (e) => {
    this._selectedTool.doMouseOut(e)
    // if (this.props.onChange) {
    //   let onChange = this.props.onChange
    //   setTimeout(() => {
    //     onChange(e.e)
    //   }, 10)
    // }
  }

  _onMouseUp = (e) => {
    this._selectedTool.doMouseUp(e)
    if (this.props.tool !== Tool.Pencil) {
      const canvas = this._fc
      const objects = canvas.getObjects()
      let newObj = objects[objects.length - 1]

      // if (this.props.tool === Tool.Eraser) {
      //   newObj.selectable = false
      //   newObj.type = 'eraser'
      // }

      if (newObj && newObj.__version === 1) {
        newObj.__originalState = newObj.toJSON()
      }
    }

    if (this.props.onChange) {
      let onChange = this.props.onChange
      setTimeout(() => {
        onChange(e.e)
      }, 10)
    }
  }

  _resize = (e) => {
    if (e) e.preventDefault()
    let { widthCorrection, heightCorrection } = this.props
    let canvas = this._fc
    let { offsetWidth, clientHeight } = this._container
    let prevWidth = canvas.getWidth()
    let prevHeight = canvas.getHeight()
    let wfactor = ((offsetWidth - widthCorrection) / prevWidth).toFixed(2)
    let hfactor = ((clientHeight - heightCorrection) / prevHeight).toFixed(2)
    canvas.setWidth(offsetWidth - widthCorrection)
    canvas.setHeight(clientHeight - heightCorrection)
    if (canvas.backgroundImage) {
      let bi = canvas.backgroundImage
      bi.width = bi.width * wfactor
      bi.height = bi.height * hfactor
    }
    let objects = canvas.getObjects()
    for (let i in objects) {
      let obj = objects[i]
      let scaleX = obj.scaleX
      let scaleY = obj.scaleY
      let left = obj.left
      let top = obj.top
      let tempScaleX = scaleX * wfactor
      let tempScaleY = scaleY * hfactor
      let tempLeft = left * wfactor
      let tempTop = top * hfactor
      obj.scaleX = tempScaleX
      obj.scaleY = tempScaleY
      obj.left = tempLeft
      obj.top = tempTop
      obj.setCoords()
    }
    this.setState({
      parentWidth: offsetWidth,
    })
    canvas.renderAll()
    canvas.calcOffset()
  }

  _backgroundColor = (color) => {
    if (!color) return
    let canvas = this._fc
    const objects = canvas.getObjects()
    let newObj = objects.forEach((obj) => {
      if (obj.type === 'eraser') {
        obj.set('stroke', color)
      }
    })

    if (newObj && newObj.__version === 1) {
      newObj.__originalState = newObj.toJSON()
    }

    canvas.setBackgroundColor(color, () => canvas.renderAll())
  }

  zoom = (factor) => {
    let canvas = this._fc
    let objects = canvas.getObjects()
    for (let i in objects) {
      objects[i].scaleX = objects[i].scaleX * factor
      objects[i].scaleY = objects[i].scaleY * factor
      objects[i].left = objects[i].left * factor
      objects[i].top = objects[i].top * factor
      objects[i].setCoords()
    }
    canvas.renderAll()
    canvas.calcOffset()
  }

  undo = () => {
    let history = this._history
    let [obj, prevState, currState] = history.getCurrent()
    history.undo()
    if (obj.__removed) {
      this.setState({ action: false }, () => {
        this._fc.add(obj)
        obj.__version -= 1
        obj.__removed = false
      })
    } else if (obj.__version <= 1) {
      this._fc.remove(obj)
    } else {
      obj.__version -= 1
      obj.setOptions(JSON.parse(prevState))
      obj.setCoords()
      this._fc.renderAll()
    }
    if (this.props.onChange) {
      this.props.onChange()
    }
  }

  redo = () => {
    let history = this._history
    if (history.canRedo()) {
      let canvas = this._fc
      let [obj, prevState, currState] = history.redo()
      if (obj.__version === 0) {
        this.setState({ action: false }, () => {
          canvas.add(obj)
          obj.__version = 1
        })
      } else {
        obj.__version += 1
        obj.setOptions(JSON.parse(currState))
      }
      obj.setCoords()
      canvas.renderAll()
      if (this.props.onChange) {
        this.props.onChange()
      }
    }
  }

  canUndo = () => {
    return this._history.canUndo()
  }

  canRedo = () => {
    return this._history.canRedo()
  }

  toDataURL = (options) => this._fc.toDataURL(options)

  toJSON = (propertiesToInclude) => this._fc.toJSON(propertiesToInclude)

  fromJSON = (json) => {
    if (!json) return
    let canvas = this._fc
    setTimeout(() => {
      canvas.loadFromJSON(json, () => {
        canvas.renderAll()
        if (this.props.onChange) {
          this.props.onChange()
        }
      })
    }, 100)
  }

  clear = (propertiesToInclude) => {
    let discarded = this.toJSON(propertiesToInclude)
    this._fc.clear()
    this._history.clear()
    return discarded
  }

  removeSelected = () => {
    let canvas = this._fc
    let activeObj = canvas.getActiveObject()
    if (activeObj) {
      let selected = []
      if (activeObj.type === 'activeSelection') {
        activeObj.forEachObject((obj) => selected.push(obj))
      } else {
        selected.push(activeObj)
      }
      selected.forEach((obj) => {
        obj.__removed = true
        let objState = obj.toJSON()
        obj.__originalState = objState
        let state = JSON.stringify(objState)
        this._history.keep([obj, state, state])
        canvas.remove(obj)
      })
      canvas.discardActiveObject()
      canvas.requestRenderAll()
    }
  }

  copy = () => {
    let canvas = this._fc
    canvas.getActiveObject().clone((cloned) => (this._clipboard = cloned))
  }

  paste = () => {
    this._clipboard.clone((clonedObj) => {
      let canvas = this._fc
      canvas.discardActiveObject()
      clonedObj.set({
        left: clonedObj.left + 10,
        top: clonedObj.top + 10,
        evented: true,
      })
      if (clonedObj.type === 'activeSelection') {
        clonedObj.canvas = canvas
        clonedObj.forEachObject((obj) => canvas.add(obj))
        clonedObj.setCoords()
      } else {
        canvas.add(clonedObj)
      }
      this._clipboard.top += 10
      this._clipboard.left += 10
      canvas.setActiveObject(clonedObj)
      canvas.requestRenderAll()
    })
  }

  setBackgroundFromDataUrl = (dataUrl, options = {}) => {
    let canvas = this._fc
    if (options.stretched) {
      delete options.stretched
      Object.assign(options, {
        width: canvas.width,
        height: canvas.height,
      })
    }
    if (options.stretchedX) {
      delete options.stretchedX
      Object.assign(options, {
        width: canvas.width,
      })
    }
    if (options.stretchedY) {
      delete options.stretchedY
      Object.assign(options, {
        height: canvas.height,
      })
    }
    let img = new Image()
    img.setAttribute('crossOrigin', 'anonymous')
    img.onload = () => canvas.setBackgroundImage(new fabric.Image(img), () => canvas.renderAll(), options)
    img.src = dataUrl
  }

  addText = (text, options = {}) => {
    let canvas = this._fc
    let iText = new fabric.IText(text, options)
    let opts = {
      left: (canvas.getWidth() - iText.width) * 0.5,
      top: (canvas.getHeight() - iText.height) * 0.5,
    }
    Object.assign(options, opts)
    iText.set({
      left: options.left,
      top: options.top,
    })

    canvas.add(iText)
  }

  componentDidMount = () => {
    let { tool, undoSteps, defaultValue, backgroundColor } = this.props

    let canvas = (this._fc = new fabric.Canvas(this._canvas))

    this._initTools(canvas)

    this._backgroundColor(backgroundColor)

    let selectedTool = this._tools[tool]
    selectedTool.configureCanvas(this.props)
    this._selectedTool = selectedTool

    window.addEventListener('resize', this._resize, false)

    this._history = new History(undoSteps)

    canvas.on('object:added', this._onObjectAdded)
    canvas.on('object:modified', this._onObjectModified)
    canvas.on('object:removed', this._onObjectRemoved)
    canvas.on('mouse:down', this._onMouseDown)
    canvas.on('mouse:move', this._onMouseMove)
    canvas.on('mouse:up', this._onMouseUp)
    canvas.on('mouse:out', this._onMouseOut)
    canvas.on('object:moving', this._onObjectMoving)
    canvas.on('object:scaling', this._onObjectScaling)
    canvas.on('object:rotating', this._onObjectRotating)

    this.disableTouchScroll()

    this._resize()
    defaultValue && this.fromJSON(defaultValue)
  }

  componentWillUnmount = () => window.removeEventListener('resize', this._resize)

  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.state.parentWidth !== prevState.parentWidth ||
      this.props.width !== prevProps.width ||
      this.props.height !== prevProps.height
    ) {
      this._resize()
    }

    if (this.props.tool !== prevProps.tool) {
      this._selectedTool = this._tools[this.props.tool] || this._tools[Tool.Pencil]
    }

    this._fc.defaultCursor = 'default'
    this._selectedTool.configureCanvas(this.props)

    if (this.props.backgroundColor !== prevProps.backgroundColor) {
      this._backgroundColor(this.props.backgroundColor)
    }

    if (this.props.defaultValue !== prevProps.defaultValue) {
      this.fromJSON(this.props.defaultValue)
    }
  }

  render = () => {
    let { className } = this.props

    let canvasDivStyle = {
      width: '100%',
      height: '100%',
    }

    return (
      <div className={className} ref={(c) => (this._container = c)} style={canvasDivStyle}>
        <canvas id={uuid4()} ref={(c) => (this._canvas = c)}>
          Sorry, Canvas HTML5 element is not supported by your browser :(
        </canvas>
      </div>
    )
  }
}

export default SketchField
