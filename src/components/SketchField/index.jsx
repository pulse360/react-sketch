import React, { Component } from 'react'
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
import Text from '../SketchTools/text'
import './styles.css'
import { debounce, omit } from 'lodash'

const fabric = require('fabric').fabric

class SketchField extends Component {
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
    heightFactor: 1,
    windowWidth: 1000,
    windowHeight: 1000,
    prevWidth: null,
    prevHeight: null,
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
  }

  _onMouseUp = (e) => {
    this._selectedTool.doMouseUp(e)
    if (this.props.tool !== Tool.Pencil) {
      const canvas = this._fc
      const objects = canvas.getObjects()
      let newObj = objects[objects.length - 1]

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

  _onPaste = (e) => {
    if (e.clipboardData) {
      var items = e.clipboardData.items
      if (!items) return

      var is_image = false
      for (var i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          var blob = items[i].getAsFile()
          var URLObj = window.URL || window.webkitURL
          var source = URLObj.createObjectURL(blob)
          this.addImg(source)
          is_image = true
        }
        if (items[i].type.indexOf('text/plain') !== -1) {
          this.addText(event.clipboardData.getData('text/plain'), { left: 10, top: 10 })
        }
      }
      if (is_image == true) {
        e.preventDefault()
      }
    }
  }

  _resize = debounce((e) => {
    if (e) {
      e.preventDefault()
    }
    let canvas = this._fc

    const currentWidth = window.innerWidth * 0.6

    this.setState({
      prevWidth: canvas.getWidth(),
      prevHeight: canvas.getHeight(),
    })

    setTimeout(() => {
      let canvas = this._fc
      canvas.uniScaleTransform = true

      let { offsetWidth, offsetHeight } = this._container

      let wfactor = (offsetWidth / this.state.prevWidth).toFixed(2)
      let hfactor = wfactor

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

      canvas.calcOffset()
      canvas.renderAll()
    }, 100)

    canvas.setWidth(currentWidth)
    canvas.setHeight(currentWidth * this.state.windowAspectRatio * this.state.heightFactor)

    this.setState({
      windowWidth: currentWidth,
      windowHeight: currentWidth * this.state.windowAspectRatio,
      parentWidth: currentWidth,
    })
  }, 300)

  _resizeWithPrevSizies = () => {
    let canvas = this._fc

    const currentWidth = window.innerWidth * 0.6

    const { prevDeviceHeight, prevDeviceWidth, defaultValue } = this.props

    let { offsetWidth, offsetHeight } = this._container

    let wfactor = (offsetWidth / prevDeviceWidth).toFixed(2)
    let hfactor = wfactor

    if (defaultValue.background) {
      this.setBackgroundImage(defaultValue.background.source)
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

    canvas.setWidth(currentWidth)
    canvas.setHeight(offsetHeight / this.state.windowAspectRatio * this.state.heightFactor)
    // this._container.width = offsetHeight / this.state.windowAspectRatio * this.state.heightFactor

    this.setState({
      windowWidth: currentWidth,
      windowHeight: currentWidth * this.state.windowAspectRatio,
      parentWidth: currentWidth,
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

  setBackgroundImage = (dataUrl, options = {}) => {
    let canvas = this._fc
    canvas.setBackgroundColor({ source: dataUrl, repeat: 'repeat' }, function () {
      canvas.renderAll()
    })
  }

  addText = (text, options = {}) => {
    let canvas = this._fc
    let textBox = new fabric.Textbox(text, options)
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
    this.setState({
      windowAspectRatio: this.state.windowWidth / window.innerHeight,
    })

    let { tool, undoSteps, defaultValue, backgroundColor } = this.props

    let canvas = (this._fc = new fabric.Canvas(this._canvas))

    this._initTools(canvas)

    // this._backgroundColor(backgroundColor)

    let selectedTool = this._tools[tool]
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

    this.enableTouchScroll()

    document.addEventListener('paste', this._onPaste, false)

    if (defaultValue) {
      this.setDefaultValue()
    } else {
      this._resize()
    }
  }

  setDefaultValue = () => {
    const { defaultValue, defaultHeightFactor } = this.props

    const data = omit(defaultValue, ['background'])

    this.fromJSON(data)

    // this.setState({
    //   heightFactor: defaultHeightFactor,
    // })

    setTimeout(this._resizeWithPrevSizies, 100)
    // this._heightNormalizer()
  }

  componentWillUnmount = () => window.removeEventListener('resize', this._resize)

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.parentWidth !== this.state.parentWidth) {
      this.setState({
        heightFactor: this.props.defaultHeightFactor,
      })
    }

    if (prevState.heightFactor !== this.state.heightFactor) {
      this._heightNormalizer()
    }

    if (this.props.tool !== prevProps.tool) {
      this._selectedTool = this._tools[this.props.tool] || this._tools[Tool.Pencil]
    }

    this._fc.defaultCursor = 'default'
    this._selectedTool.configureCanvas(this.props)

    // if (this.props.backgroundColor !== prevProps.backgroundColor) {
    //   this._backgroundColor(this.props.backgroundColor)
    // }

    if (this.props.defaultValue !== prevProps.defaultValue) {
      this.fromJSON(this.props.defaultValue)
    }
  }

  clearHeightFactor = () => {
    this.setState({
      heightFactor: 1,
    })
    this._heightNormalizer()
  }

  _heightNormalizer = () => {
    const currentWidth = window.innerWidth * 0.6

    let canvas = this._fc

    this.setState({
      windowWidth: currentWidth,
      windowHeight: currentWidth * this.state.windowAspectRatio,
    })

    canvas.setWidth(currentWidth)
    canvas.setHeight(currentWidth * this.state.windowAspectRatio * this.state.heightFactor)
    canvas.renderAll()
  }

  addPage = () => {
    this.setState({
      heightFactor: (this.state.heightFactor += 1),
    })
    this._heightNormalizer()
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

  render = () => {
    let { className } = this.props
    const { heightFactor } = this.state

    const width = window.innerWidth * 0.6
    const height = width * this.state.windowAspectRatio * heightFactor
    console.log(height, 'height')
    console.log(width, 'width')
    console.log(this.state.windowAspectRatio, 'windowAspectRatio')
    console.log(heightFactor, 'heightFactor')

    let canvasDivStyle = {
      width: width,
      height: height,
      margin: '0 auto',
      marginTop: 10,
    }

    // let canvasDivStyle = {
    //   width: '100%',
    //   height: '100%',
    //   // margin: '10px auto',
    // }

    return (
      <>
        <div className='sketchfield__add-page-button' onClick={this.addPage}>
          Add page
        </div>
        <div className={className} ref={(c) => (this._container = c)} style={canvasDivStyle} id='canvas'>
          <canvas id={uuid4()} ref={(c) => (this._canvas = c)}>
            Sorry, Canvas HTML5 element is not supported by your browser :(
          </canvas>
        </div>
      </>
    )
  }
}

export default SketchField
