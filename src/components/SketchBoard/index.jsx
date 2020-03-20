/*eslint no-unused-vars: 0, no-console: 0*/

import React from 'react'
import 'flexboxgrid'
import './styles.css'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import color from '@material-ui/core/colors/blueGrey'
import { SketchField, Appbar, ToolsUI, FillColor, BackgroundImage, ToolsPanel, StrokeColor } from '../'
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
      canUndo: false,
      canRedo: false,
      expandTools: false,
      expandFillColor: false,
      expandStrokeColor: false,
      expandBackground: false,
      expandImages: false,
      text: 'a text, cool!',
      enableCopyPaste: false,
      anchorEl: null,
      fullScreen: false,
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
            getFullScreenStatus={this.props.getFullScreenStatus}
            handleFullScreen={() => this.setState({ fullScreen: !this.state.fullScreen })}
            fullScreen={this.state.fullScreen}
            fillColor={this.state.fillWithColor ? this.state.fillColor : 'transparent'}
            lineColor={this.state.lineColor}
            zoomIn={() => this._sketch.zoom(1.25)}
            zoomOut={() => this._sketch.zoom(0.8)}
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
            copyPasteClick={(e) => {
              this._sketch.copy()
              this._sketch.paste()
            }}
            toolsOpen={() => this.setState({ expandTools: !this.state.expandTools })}
            colorsOpen={() => this.setState({ expandColors: !this.state.expandColors })}
            backgroundOpen={() => this.setState({ expandBack: !this.state.expandBack })}
            lineWidth={this.state.lineWidth}
            changeLineWidth={(value) => this.setState({ lineWidth: value })}
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
          <BackgroundImage
            open={this.state.expandBackground}
            handleOpen={(e) => this.setState({ expandBackground: !this.state.expandBackground })}
            color={this.state.backgroundColor}
            changeColor={(color) => this.setState({ backgroundColor: color.hex })}
            anchorEl={this.state.anchorEl}
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
              backgroundColor={this.state.backgroundColor}
              forceValue
              onChange={this._onSketchChange}
              tool={this.state.tool}
              defaultValue={this.props.defaultValue}
              width='100%'
              height='100%'
            />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default SketchBoard
