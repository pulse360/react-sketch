/*eslint no-unused-vars: 0, no-console: 0*/

import React from 'react'
import 'flexboxgrid'
import './styles.css'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import color from '@material-ui/core/colors/blueGrey'
import { SketchField, Appbar, ToolsUI, FillColor, Background, ToolsPanel, StrokeColor } from '../'
import Tools from '../Tools'

class SketchBoard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      lineWidth: 10,
      lineColor: '#000000',
      fillColor: '#68CCCA',
      backgroundColor: '#ffffff',
      tool: Tools.Pencil,
      enableRemoveSelected: false,
      fillWithColor: false,
      fillWithBackgroundColor: false,
      drawings: [],
      canUndo: false,
      canRedo: false,
      stretched: true,
      stretchedX: false,
      stretchedY: false,
      originX: 'left',
      originY: 'top',
      expandTools: false,
      expandFillColor: false,
      expandStrokeColor: false,
      expandBack: false,
      expandImages: false,
      text: 'a text, cool!',
      enableCopyPaste: false,
      anchorEl: null,
      fillOpen: false,
    }
  }

  openPopup = (key) => {
    this.setState(() => ({
      [key]: !this.state[key],
    }))
  }

  setAnchorEl = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    })
  }

  _selectTool = (tool) => {
    this.setState({
      tool: tool,
      enableRemoveSelected: tool === Tools.Select,
      enableCopyPaste: tool === Tools.Select,
    })
  }

  _save = () => {
    this.props.onSaveCanvas(JSON.stringify(this._sketch.toJSON()))
  }

  _download = () => {
    // this.props.onSaveCanvas(JSON.stringify(this._sketch.toJSON()))
  }

  _removeMe = (index) => {
    let drawings = this.state.drawings
    drawings.splice(index, 1)
    this.setState({ drawings: drawings })
  }

  _undo = () => {
    this._sketch.undo()
    this.setState({
      canUndo: this._sketch.canUndo(),
      canRedo: this._sketch.canRedo(),
    })
  }

  _redo = () => {
    this._sketch.redo()
    this.setState({
      canUndo: this._sketch.canUndo(),
      canRedo: this._sketch.canRedo(),
    })
  }

  _clear = () => {
    this._sketch.clear()
    this._sketch.setBackgroundFromDataUrl('')
    this.setState({
      backgroundColor: 'transparent',
      fillWithBackgroundColor: false,
      canUndo: this._sketch.canUndo(),
      canRedo: this._sketch.canRedo(),
    })
  }

  _removeSelected = () => {
    this._sketch.removeSelected()
  }

  _onSketchChange = () => {
    let prev = this.state.canUndo
    let now = this._sketch.canUndo()
    if (prev !== now) {
      this.setState({ canUndo: now })
    }
  }

  _onBackgroundImageDrop = (accepted) => {
    if (accepted && accepted.length > 0) {
      let sketch = this._sketch
      let reader = new FileReader()
      let { stretched, stretchedX, stretchedY, originX, originY } = this.state
      reader.addEventListener(
        'load',
        () =>
          sketch.setBackgroundFromDataUrl(reader.result, {
            stretched: stretched,
            stretchedX: stretchedX,
            stretchedY: stretchedY,
            originX: originX,
            originY: originY,
          }),
        false
      )
      reader.readAsDataURL(accepted[0])
    }
  }

  _addText = () => {
    this._selectTool('select')
    this._sketch.addText(this.state.text)
  }

  componentDidMount = () => {
    ;(function(console) {
      console.save = function(data, filename) {
        if (!data) {
          console.error('Console.save: No data')
          return
        }
        if (!filename) filename = 'console.json'
        if (typeof data === 'object') {
          data = JSON.stringify(data, undefined, 4)
        }
        var blob = new Blob([data], { type: 'text/json' }),
          e = document.createEvent('MouseEvents'),
          a = document.createElement('a')
        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
      }
    })(console)
  }

  render = () => {
    const theme = createMuiTheme({
      typography: {
        useNextVariants: true,
      },
      palette: {
        primary: { main: color[500] },
        secondary: { main: '#11cb5f' },
      },
    })

    return (
      <MuiThemeProvider theme={theme}>
        <div className='wrapper'>
          <Appbar
            selectTool={this._selectTool}
            openPopup={this.openPopup}
            setAnchorEl={(event) => this.setAnchorEl(event)}
            canUndo={this.state.canUndo}
            canRedo={this.state.canRedo}
            save={this._save}
            download={this._download}
            clear={this._clear}
            redo={this._redo}
            undo={this._undo}
            enableCopyPaste={!this.state.enableCopyPaste}
            enableRemoveSelected={!this.state.enableRemoveSelected}
            removeSelected={this._removeSelected}
            copyPasteClick={(e) => {
              this._sketch.copy()
              this._sketch.paste()
            }}
            toolsOpen={() => this.setState({ expandTools: !this.state.expandTools })}
            colorsOpen={() => this.setState({ expandColors: !this.state.expandColors })}
            backgroundOpen={() => this.setState({ expandBack: !this.state.expandBack })}
            imagesOpen={() => this.setState({ expandImages: !this.state.expandImages })}
            lineWidth={this.state.lineWidth}
            changeLineWidth={(e, v) => this.setState({ lineWidth: v })}
          />
          <ToolsUI
            open={this.state.expandTools}
            handleOpen={(e) => this.setState({ expandTools: !this.state.expandTools })}
            changeText={(e) => this.setState({ text: e.target.value })}
            text={this.state.text}
            addText={this._addText}
          />
          <FillColor
            open={this.state.expandFillColor}
            handleOpen={(e) => this.setState({ expandFillColor: !this.state.expandFillColor })}
            color={this.state.fillColor}
            changeColor={(color) => this.setState({ fillColor: color.hex })}
            anchorEl={this.state.anchorEl}
            fillWithColor={this.state.fillWithColor}
            onFillWithColorChange={(bool) =>
              this.setState({
                fillWithColor: bool,
              })
            }
          />
          <StrokeColor
            open={this.state.expandStrokeColor}
            handleOpen={(e) => this.setState({ expandStrokeColor: !this.state.expandStrokeColor })}
            color={this.state.lineColor}
            changeColor={(color) => this.setState({ lineColor: color.hex })}
            anchorEl={this.state.anchorEl}
          />
          {/* <Colors
            open={this.state.expandColors}
            handleOpen={(e) => this.setState({ expandColors: !this.state.expandColors })}
            lineColor={this.state.lineColor}
            changeLineColor={(color) => this.setState({ lineColor: color.hex })}
            fillWithColor={this.state.fillWithColor}
            changeFillWithColor={(e) => this.setState({ fillWithColor: !this.state.fillWithColor })}
            fillColor={this.state.fillColor}
            changeFillColor={(color) => this.setState({ fillColor: color.hex })}
          /> */}
          <Background
            open={this.state.expandBack}
            handleOpen={(e) => this.setState({ expandBack: !this.state.expandBack })}
            fillWithBackgroundColor={this.state.fillWithBackgroundColor}
            changeFillWithBackgroundColor={(e) =>
              this.setState({
                fillWithBackgroundColor: !this.state.fillWithBackgroundColor,
              })
            }
            backgroundColor={this.state.backgroundColor}
            changeBackgroundColor={(color) => this.setState({ backgroundColor: color.hex })}
            stretched={this.state.stretched}
            changeStretched={(e) => this.setState({ stretched: !this.state.stretched })}
            stretchedX={this.state.stretchedX}
            changeStretchedX={(e) => this.setState({ stretchedX: !this.state.stretchedX })}
            stretchedY={this.state.stretchedY}
            changeStretchedY={(e) => this.setState({ stretchedY: !this.state.stretchedY })}
            onDrop={this._onBackgroundImageDrop}
          />
          <div className='bottom'>
            <ToolsPanel
              selectTool={(tool) => this._selectTool(tool)}
              addImage={(image) => this._sketch.addImg(image)}
            />
            <SketchField
              name='sketch'
              className='canvas-area'
              ref={(c) => (this._sketch = c)}
              lineColor={this.state.lineColor}
              lineWidth={this.state.lineWidth}
              fillColor={this.state.fillWithColor ? this.state.fillColor : 'transparent'}
              backgroundColor={this.state.fillWithBackgroundColor ? this.state.backgroundColor : 'transparent'}
              forceValue
              onChange={this._onSketchChange}
              tool={this.state.tool}
              defaultValue={this.props.defaultValue}
            />
          </div>
          <div style={{ width: 0 }}>
            <div className='col-xs-7 col-sm-7 col-md-9 col-lg-9'>
              <div className='col-xs-5 col-sm-5 col-md-3 col-lg-3'></div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default SketchBoard
