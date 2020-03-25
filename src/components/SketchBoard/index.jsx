/*eslint no-unused-vars: 0, no-console: 0*/

import React from 'react'
import 'flexboxgrid'
import './styles.css'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import color from '@material-ui/core/colors/blueGrey'
import { SketchField, Appbar, ToolsUI, FillColor, BackgroundImage, ToolsPanel, StrokeColor, Tabs } from '../'
import Tools from '../Tools'
import jsPDF from 'jspdf'

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
      sketchValue: [],
      currentTabID: 'tab_1',
      tabs: [{ data: [], id: 'tab_1', name: 'Tab #1' }],
      activeQuicklyPenID: null,
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

  _selectTool = (tool, inQuicklyPen) => {
    if (inQuicklyPen) {
      this.setState({
        tool: tool,
        enableRemoveSelected: tool === Tools.Select,
        enableCopyPaste: tool === Tools.Select,
      })
    } else {
      this.setState({
        tool: tool,
        enableRemoveSelected: tool === Tools.Select,
        enableCopyPaste: tool === Tools.Select,
        activeQuicklyPenID: null,
      })
    }
  }

  _save = () => {
    // this.props.onSaveCanvas(JSON.stringify(this._sketch.toJSON()))
    // var doc = new jsPDF()
    // console.log(this._sketch)
    // doc.text('Hello world!', 20, 20)
    // doc.text('This is client-side Javascript, pumping out a PDF.', 20, 30)
    // doc.addPage('a5', 'l')
    // doc.text('Do you like that?', 20, 20)
    // doc.save('a4.pdf')
    // const image = this._sketch.toDataURL('image/jpeg', 1.0)
    // const pdf = new jsPDF({
    //   orientation: 'p',
    //   unit: 'px',
    //   format: 'a4',
    // })
    // pdf.addImage(image, 'JPEG', 0, 0)
    // pdf.save('pdf')
    // И создаем из него картиику в base64
    // const image = {
    //   data: this._sketch.toDataURL('image/jpeg', 1.0),
    //   height: this._sketch._fc.height,
    //   width: this._sketch._fc.width,
    // }
    // const dpi = document.getElementById('dpi').offsetHeight
    // const widthMM = (image.width * 25.4) / dpi
    // const heightMM = (image.height * 25.4) / dpi
    // var doc = new jsPDF({
    //   orientation: 'p',
    //   unit: 'mm',
    // })
    // doc.addImage(image.data, 'JPEG', 0, 0, 210, 298)
    // doc.save('save')
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
    this._onSketchChange()
    this.setState({
      backgroundColor: 'transparent',
      canUndo: this._sketch.canUndo(),
      canRedo: this._sketch.canRedo(),
    })
  }

  _removeSelected = () => {
    this._sketch.removeSelected()
  }

  addTab = () => {
    if (this.state.tabs.length === 9) {
      return
    }

    this.setState(({ tabs }) => {
      const newTabID = `tab_${tabs.length + 1}`

      const newTab = {
        data: [],
        id: newTabID,
        name: `Tab #${tabs.length + 1}`,
      }

      return { tabs: [...tabs, newTab], currentTabID: newTabID, sketchValue: [] }
    })
  }

  onTabClick = (tab) => {
    this.setState(({ tabs }) => {
      const indx = tabs.findIndex((el) => el.id === tab.id)
      return {
        currentTabID: tab.id,
        sketchValue: tabs[indx].data,
      }
    })
  }

  _onSketchChange = () => {
    this.setState(({ tabs, currentTabID }) => {
      const indx = tabs.findIndex((el) => el.id === currentTabID)
      const newItem = { ...tabs[indx], data: JSON.stringify(this._sketch.toJSON()) }
      return { tabs: [...tabs.slice(0, indx), newItem, ...tabs.slice(indx + 1)] }
    })

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
    this._sketch.addText(this.state.text, { fontSize: 24 })
  }

  _print = () => {
    // this.props.onSaveCanvas(JSON.stringify(this._sketch.toJSON()))
    // const doc = new jsPDF()
    // doc.text('Hello world!', 20, 20)
    // doc.text('This is client-side Javascript, pumping out a PDF.', 20, 30)
    // doc.addPage('a5', 'l')
    // doc.text('Do you like that?', 20, 20)
    // // doc.save('a4.pdf')
    // const image = this._sketch.toDataURL('image/jpeg', 1.0)
    // const pdf = new jsPDF({
    //   orientation: 'p',
    //   unit: 'px',
    //   format: 'a4',
    // })
    // pdf.addImage(image, 'JPEG', 0, 0)
    // pdf.save('pdf')
    const image = {
      data: this._sketch.toDataURL('image/jpeg', 1.0),
      height: this._sketch._fc.height,
      width: this._sketch._fc.width,
    }
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
    })
    doc.addImage(image.data, 'JPEG', 0, 0, 210, 298)
    doc.save('save')
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
            print={this._print}
            activeQuicklyPenID={this.state.activeQuicklyPenID}
            selectQuicklyPen={(color, width) => {
              this.setState({
                lineColor: color || '#000000',
                lineWidth: width,
              })
              this._selectTool('pen', true)
            }}
            changeActiveQuicklyPenID={(id) => {
              this.setState({ activeQuicklyPenID: id })
            }}
            getFullScreenStatus={() => this.props.getFullScreenStatus(!this.state.fullScreen)}
            handleFullScreen={() => this.setState({ fullScreen: !this.state.fullScreen })}
            fullScreen={this.state.fullScreen}
            fillColor={this.state.fillWithColor ? this.state.fillColor : 'transparent'}
            lineColor={this.state.lineColor}
            zoomIn={() => {
              this._sketch.zoom(1.25)
              this._onSketchChange()
            }}
            zoomOut={() => {
              this._sketch.zoom(0.8)
              this._onSketchChange()
            }}
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
            // copyPasteClick={(e) => {
            //   this._sketch.copy()
            //   this._sketch.paste()
            // }}
            colorsOpen={() => this.setState({ expandColors: !this.state.expandColors })}
            backgroundOpen={() => this.setState({ expandBack: !this.state.expandBack })}
            lineWidth={this.state.lineWidth}
            changeLineWidth={(value) => {
              this.setState({ lineWidth: value })

              if (this.state.activeQuicklyPenID) {
                window.localStorage.setItem(`${this.state.activeQuicklyPenID}_width`, value)
              }
            }}
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
            changeColor={(color) => {
              this.setState({ lineColor: color.hex })
              if (this.state.activeQuicklyPenID) {
                window.localStorage.setItem(`${this.state.activeQuicklyPenID}_color`, color.hex)
              }
            }}
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
              addText={this._addText}
              selectedTool={this.state.tool}
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
              defaultValue={this.state.sketchValue}
              fullScreen={this.state.fullScreen}
            />
          </div>
          <Tabs
            tabs={this.state.tabs}
            onTabClick={this.onTabClick}
            onAddTab={this.addTab}
            currentTabID={this.state.currentTabID}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default SketchBoard
