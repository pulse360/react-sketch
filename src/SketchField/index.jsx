// @ts-check
import { IconButton, Snackbar } from '@material-ui/core'
import React, { Component } from 'react'
import Tool from '../Constants/Tools'
import fileDownloader from '../fileDownloader'
import Arrow from '../SketchTools/arrow'
import Circle from '../SketchTools/circle'
import Eraser from '../SketchTools/eraser'
import Highlighter from '../SketchTools/highlighter'
import History from '../SketchTools/history'
import Line from '../SketchTools/line'
import Pan from '../SketchTools/pan'
import Pencil from '../SketchTools/pencil'
import Rectangle from '../SketchTools/rectangle'
import Select from '../SketchTools/select'
import Text from '../SketchTools/text'
import { CloseIcon } from '../UI/SVG'
import { debounce, disableScrolling, enableScrolling } from '../utils'

const fabric = require('fabric').fabric

class SketchField extends Component {
  static defaultProps = {
    lineColor: 'black',
    lineWidth: 10,
    fillColor: 'transparent',
    backgroundColor: 'transparent',
    opacity: 1.0,
    undoSteps: 25,
    tool: Tool.Pencil,
    widthCorrection: 0,
    heightCorrection: 0,
    forceValue: false,
  }

  state = {
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
    this._tools[Tool.Text] = new Text(fabricCanvas)
  }

  addImg = (dataUrl, options = {}) => {
    const canvas = this._fc
    fabric.Image.fromURL(dataUrl, (oImg) => {
      let opts = {
        left: Math.random() * (canvas.getWidth() - oImg.width * 0.5),
        top: Math.random() * (canvas.getHeight() - oImg.height) * 0.5,
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
    const obj = e.target
    obj.__version = 1
    const objState = obj.toJSON()
    obj.__originalState = objState
    const state = JSON.stringify(objState)
    this._history.keep([obj, state, state])
  }

  _onObjectMoving = () => {}

  _onObjectScaling = () => {}

  _onObjectRotating = () => {}

  _onObjectModified = (e) => {
    const obj = e.target
    obj.__version += 1
    const prevState = JSON.stringify(obj.__originalState)
    const objState = obj.toJSON()
    obj.__originalState = objState
    const currState = JSON.stringify(objState)
    this._history.keep([obj, prevState, currState])
  }

  _onObjectRemoved = (e) => {
    const obj = e.target
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
  }

  _onMouseUp = (e) => {
    this._selectedTool.doMouseUp(e)
    if (this.props.tool !== Tool.Pencil) {
      const canvas = this._fc
      const objects = canvas.getObjects()
      const newObj = objects[objects.length - 1]
      if (newObj && newObj.__version === 1) {
        newObj.__originalState = newObj.toJSON()
      }
    }
    if (this.props.onChange) {
      const onChange = this.props.onChange
      setTimeout(() => {
        onChange(e.e)
      }, 10)
    }
  }

  _onPaste = (e) => {
    if (e.clipboardData) {
      const items = e.clipboardData.items
      if (!items) return

      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item.type.indexOf('image') !== -1) {
          const blob = item.getAsFile()
          const reader = new FileReader()
          reader.onloadend = () => {
            this.addImg(reader.result)
            e.preventDefault()
          }
          reader.readAsDataURL(blob)
        } else if (item.type.indexOf('text/plain') !== -1) {
          item.getAsString((text) => this.addText(text, { left: 10, top: 10 }))
        }
      }
    }
  }

  scaleElementsAndCanvas(canvas, prevWidth, currentWidth, prevHeight, currentHeight) {
    const wfactor = currentWidth / prevWidth
    const hfactor = wfactor
    const newHeight = this.getNewHeight(prevHeight, currentHeight, hfactor)
    const newWidth = currentWidth

    canvas.setWidth(newWidth)
    canvas.setHeight(newHeight)

    const objects = canvas.getObjects()

    for (const i in objects) {
      const obj = objects[i]
      const scaleX = obj.scaleX
      const scaleY = obj.scaleY
      const left = obj.left
      const top = obj.top
      const tempScaleX = scaleX * wfactor
      const tempScaleY = scaleY * hfactor
      const tempLeft = left * wfactor
      const tempTop = top * hfactor
      obj.scaleX = tempScaleX
      obj.scaleY = tempScaleY
      obj.left = tempLeft
      obj.top = tempTop
      obj.setCoords()
    }

    canvas.renderAll()
    canvas.calcOffset()
  }

  _resize = debounce((e) => {
    if (e) {
      e.preventDefault()
    }

    const canvas = this._fc

    const currentWidth = this.getSketchWidth()
    const currentHeight = this.getSketchHeight()
    const prevWidth = canvas.getWidth()
    const prevHeight = canvas.getHeight()

    this.scaleElementsAndCanvas(canvas, prevWidth, currentWidth, prevHeight, currentHeight)
  }, 1000)

  _resizeWithPrevSizies = () => {
    const canvas = this._fc
    const { defaultValue } = this.props

    const currentWidth = this.getSketchWidth()
    const currentHeight = this.getSketchHeight()
    const prevWidth = defaultValue.canvasWidth || currentWidth
    const prevHeight = defaultValue.canvasHeight || currentHeight

    this.scaleElementsAndCanvas(canvas, prevWidth, currentWidth, prevHeight, currentHeight)

    this.setBackgroundImage(defaultValue.background)
  }

  undo = () => {
    const history = this._history
    if (history.canUndo()) {
      const [obj, prevState, currState] = history.getCurrent()
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
  }

  redo = () => {
    const history = this._history
    if (history.canRedo()) {
      const canvas = this._fc
      const [obj, prevState, currState] = history.redo()
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

  printCurrent = (filename) => {
    const id = new Date().getTime()
    fileDownloader({
      filename,
      tabs: {
        [id]: {
          id,
          data: this.toDataURL({ format: 'jpeg', quality: 0.8 }),
          proportion: this._fc.getHeight() / this._fc.getWidth(),
        },
      },
    })
  }

  toDataURL = (options) => this._fc.toDataURL(options)

  toJSON = (propertiesToInclude) => this._fc.toJSON(propertiesToInclude)

  saveToJSON(propertiesToInclude) {
    const canvas = this._fc
    const data = canvas.toJSON(propertiesToInclude)

    data.sketchWidth = this.getSketchWidth()
    data.sketchHeight = this.getSketchHeight()
    data.canvasWidth = canvas.getWidth()
    data.canvasHeight = canvas.getHeight()

    return data
  }

  fromJSON = (json, callback) => {
    if (!json) return
    const canvas = this._fc
    setTimeout(() => {
      canvas.loadFromJSON(json, () => {
        if (this.props.onChange) {
          this.props.onChange()
        }

        callback && callback()
      })
    }, 100)
  }

  clear = (propertiesToInclude) => {
    const discarded = this.toJSON(propertiesToInclude)
    const background = this.props.defaultValue.background
    this._fc.clear()
    this._history.clear()
    this.setBackgroundImage(background)
    return discarded
  }

  removeSelected = () => {
    const canvas = this._fc
    const activeObj = canvas.getActiveObject()
    if (activeObj) {
      const selected = []
      if (activeObj.type === 'activeSelection') {
        activeObj.forEachObject((obj) => selected.push(obj))
      } else {
        selected.push(activeObj)
      }
      selected.forEach((obj) => {
        obj.__removed = true
        const objState = obj.toJSON()
        obj.__originalState = objState
        const state = JSON.stringify(objState)
        this._history.keep([obj, state, state])
        canvas.remove(obj)
      })
      canvas.discardActiveObject()
      canvas.requestRenderAll()
    }
  }

  copy = () => {
    const canvas = this._fc
    canvas.getActiveObject().clone((cloned) => (this._clipboard = cloned))
  }

  paste = () => {
    this._clipboard.clone((clonedObj) => {
      const canvas = this._fc
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

  setBackgroundImage = (params) => {
    this._fc.setBackgroundColor(params, () => this._fc.renderAll())
  }

  addText = (text, options = {}) => {
    const canvas = this._fc
    const textBox = new fabric.Textbox(text, options)
    let opts = {
      left: (canvas.getWidth() - textBox.width) * 0.5,
      top: (canvas.getHeight() - textBox.height) * 0.5,
    }
    Object.assign(options, opts)
    textBox.set({
      left: 50,
      top: 50,
      fontSize: 18,
      width: canvas.width - 100,
      splitByGrapheme: true,
      fontFamily: 'sans-serif',
      borderColor: 'grey',
      cornerColor: 'black',
      cornerSize: 10,
      transparentCorners: true,
      lineHeight: 1.25,
    })

    textBox.setControlsVisibility({
      mt: false,
      mb: false,
    })

    canvas.add(textBox)
    this.props.selectTool()
  }

  componentDidMount = () => {
    disableScrolling()
    const { tool, undoSteps, defaultValue, backgroundColor } = this.props
    const canvas = (this._fc = new fabric.Canvas(this._canvas))
    canvas.enableRetinaScaling = false
    canvas.allowTouchScrolling = false
    canvas.setWidth(this.getSketchWidth())
    canvas.setHeight(this.getSketchHeight())
    this._initTools(canvas)

    const selectedTool = this._tools[tool]
    selectedTool.configureCanvas(this.props)
    this._selectedTool = selectedTool

    window.addEventListener('resize', this._resize, false)

    this._history = new History(undoSteps)

    canvas.on('object:added', this._onObjectAdded)
    canvas.on('object:modified', this._onObjectModified)
    canvas.on('object:removed', this._onObjectRemoved)

    canvas.on('touchstart', this._onMouseDown)
    canvas.on('touchend', this._onMouseUp)
    canvas.on('touchmove', this._onMouseMove)
    canvas.on('touchcancel', this._onMouseOut)

    canvas.on('pointerdown', this._onMouseDown)
    canvas.on('pointerup', this._onMouseUp)
    canvas.on('pointermove', this._onMouseMove)
    canvas.on('pointerleave', this._onMouseOut)
    canvas.on('pointerout', this._onMouseOut)

    canvas.on('mouse:down', this._onMouseDown)
    canvas.on('mouse:up', this._onMouseUp)
    canvas.on('mouse:move', this._onMouseMove)
    canvas.on('mouse:out', this._onMouseOut)

    canvas.on('object:moving', this._onObjectMoving)
    canvas.on('object:scaling', this._onObjectScaling)
    canvas.on('object:rotating', this._onObjectRotating)

    document.addEventListener('paste', this._onPaste, false)

    this.setDefaultValue()
  }

  setDefaultValue = () => {
    const { defaultValue } = this.props
    const { background, ...data } = defaultValue || {}

    this.fromJSON(data, this._resizeWithPrevSizies)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this._resize)
    enableScrolling()
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.tool !== prevProps.tool) {
      this._selectedTool = this._tools[this.props.tool] || this._tools[Tool.Pencil]
    }

    this._fc.defaultCursor = 'default'
    this._selectedTool.configureCanvas(this.props)

    if (this.props.defaultValue !== prevProps.defaultValue) {
      this.fromJSON(this.props.defaultValue, this._resizeWithPrevSizies)
    }
  }

  setBackgroundFromDataUrl = (dataUrl, options = {}) => {
    const canvas = this._fc
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
    const img = new Image()
    img.setAttribute('crossOrigin', 'anonymous')
    img.onload = () => canvas.setBackgroundImage(new fabric.Image(img), () => canvas.renderAll(), options)
    img.src = dataUrl
  }

  getSketchWidth() {
    const lowerCanvasElement = document.querySelector('.sketch-area')
    return lowerCanvasElement.clientWidth
  }

  getSketchHeight() {
    const lowerCanvasElement = document.querySelector('.sketch-area')
    return lowerCanvasElement.clientHeight
  }

  getNewHeight(prevHeight, currentHeight, hfactor) {
    // TOOD: if it doesn't exist any elaments => height should be the size of screen
    // TODO: get the lowest element on the canvas and check the position and compare with currentHeight

    const scalePrevHeight = prevHeight * hfactor
    const newHeight = scalePrevHeight < currentHeight ? currentHeight : scalePrevHeight

    return newHeight
  }

  render = () => {
    const { className } = this.props
    const { showMessage } = this.state

    const canvasDivStyle = {
      margin: '0 auto',
      transform: 'translate3d(0,0,1px)',
      marginTop: -1,
    }

    const canvaStyle = {
      transform: 'translate3d(0,0,1px)',
    }

    return (
      <>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={showMessage}
          autoHideDuration={1500}
          onClose={() => this.setState({ showMessage: false })}
          message={'New page added'}
          action={
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              direction='up'
              onClick={() => this.setState({ showMessage: false })}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          }
        />
        <div className={className} ref={(c) => (this._container = c)} style={canvasDivStyle} id='container_canvas'>
          <canvas id='canvas' ref={(c) => (this._canvas = c)} style={canvaStyle}>
            Sorry, Canvas HTML5 element is not supported by your browser :(
          </canvas>
        </div>
      </>
    )
  }
}
export default SketchField
