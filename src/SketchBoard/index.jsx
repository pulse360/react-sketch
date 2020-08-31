/*eslint no-unused-vars: 0, no-console: 0*/
import color from '@material-ui/core/colors/blueGrey'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import { AddTextDrawer, Appbar, FillColor, NavigationAndTabs, SketchField, StrokeColor, ToolsPanel } from '../'
import TabTypes from '../Constants/TabTypes'
import Tools from '../Constants/Tools'
import './styles.css'

class SketchBoard extends React.Component {
  constructor(props) {
    super(props)
    const initialData = props.defaultValue.data || props.defaultValue
    const isEdit = initialData && initialData.currentTabID

    this.state = {
      lineWidth: 1,
      passedLineWidth: 1,
      lineColor: '#000000',
      passedLineColor: '#000000',
      fillColor: '#68CCCA',
      backgroundColor: 'transparent',
      tool: Tools.Pencil,
      enableRemoveSelected: false,
      fillWithColor: false,
      canUndo: false,
      canRedo: false,
      expandText: false,
      expandFillColor: false,
      expandStrokeColor: false,
      expandBackground: false,
      expandImages: false,
      text: '',
      enableCopyPaste: false,
      anchorEl: null,
      fullScreen: false,
      sketchValue: isEdit ? initialData.tabs[initialData.currentTabID].data : "",
      currentTabID: isEdit ? initialData.currentTabID : 'page_1',
      tabs: isEdit ? initialData.tabs : { page_1: { data: "", id: 'page_1', order: 0, type: TabTypes.Note, name: '#1' } },
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
    if (tool === 'highlighter') {
      this.setState(() => ({
        lineWidth: 25,
        tool: tool,
        enableRemoveSelected: tool === Tools.Select,
        enableCopyPaste: tool === Tools.Select,
        activeQuicklyPenID: null,
        lineColor: this.state.passedLineColor,
      }))
    }

    if (tool !== 'pen' && tool !== 'highlighter') {
      this.setState({
        tool: tool,
        enableRemoveSelected: tool === Tools.Select,
        enableCopyPaste: tool === Tools.Select,
        activeQuicklyPenID: null,
        lineColor: this.state.passedLineColor,
        lineWidth: this.state.passedLineWidth,
      })
    }

    if (tool === 'pen') {
      this.setState({
        tool: tool,
        enableRemoveSelected: tool === Tools.Select,
        enableCopyPaste: tool === Tools.Select,
        // lineWidth: 3,
      })
    }
    if (tool !== 'highlighter' && !inQuicklyPen) {
      this.setState({
        tool: tool,
        enableRemoveSelected: tool === Tools.Select,
        enableCopyPaste: tool === Tools.Select,
        activeQuicklyPenID: null,
        lineColor: this.state.passedLineColor,
        lineWidth: this.state.passedLineWidth,
      })
    }
  }

  _save = ({ withClose }) => {
    this.props.onSaveCanvas(
      {
        data: {
          currentTabID: this.state.currentTabID,
          tabs: this._getCurrentSketchPadTabsValue(this.state.tabs)
        }
      },
      withClose
    )
  }


  _getCurrentSketchPadTabsValue = (tabs) => {
    const { currentTabID } = this.state
    return {
      ...tabs,
      [currentTabID]: {
        ...tabs[currentTabID],
        data: this._sketch.saveToJSON()
      }
    }
  }

  _download = () => {
    // this.props.onSaveCanvas(JSON.stringify(this._sketch.toJSON()))
  }

  _removeMe = (index) => {
    const drawings = this.state.drawings
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
    this._onSketchChange()
    this.setState({
      backgroundColor: '#ffffff',
      canUndo: this._sketch.canUndo(),
      canRedo: this._sketch.canRedo(),
    })
  }

  _removeSelected = () => {
    this._sketch.removeSelected()
  }

  _scrollUp = () => {
    const currentScroll = this._sketch._container.scrollTop || 0
    let nextScrollPosition = currentScroll - 350
    if (nextScrollPosition < 0) nextScrollPosition = 0
    this._sketch._container.scrollTo(0, nextScrollPosition)
  }

  _scrollDown = () => {
    const currentScroll = this._sketch._container.scrollTop || 0
    const nextScrollPosition = currentScroll + 350
    this._sketch._container.scrollTo(0, nextScrollPosition)
  }


  addTab = (type = TabTypes.Note, callBack) => {
    const numberOfTabs = Object.keys(this.state.tabs).length;
    if (numberOfTabs === 9) {
      return
    }
    this.setState(({ tabs }) => {
      const newTab = {
        type,
        data: (type === TabTypes.Whiteboard) ? { background: 'white' } : {},
        order: numberOfTabs,
        id: `${type}_${numberOfTabs + 1}`,
        name: `#${numberOfTabs + 1}`,
      }
      return {
        currentTabID: newTab.id,
        sketchValue: newTab.data,
        tabs: {
          ...this._getCurrentSketchPadTabsValue(tabs),
          [newTab.id]: newTab
        }
      }
    }, () => {
      this._clear()
      callBack && callBack()
    }
    )
  }

  onTabClick = (tab) => {
    const tabs = this.state.tabs
    this.setState({
      currentTabID: tabs[tab.id].id,
      sketchValue: tabs[tab.id].data,
      tabs: this._getCurrentSketchPadTabsValue(tabs)
    }, () => this.setState({
      canUndo: this._sketch.canUndo(),
      canRedo: this._sketch.canRedo(),
    }))
  }

  _createNewPresentationPage = () => {
    this.addTab(TabTypes.Whiteboard)
  }

  _onSketchChange = () => {

    const prev = this.state.canUndo
    const now = this._sketch.canUndo()
    if (prev !== now) {
      this.setState({ canUndo: now })
    }
  }


  _addText = () => {
    this._selectTool('select')
    this._sketch.addText(this.state.text, { fontSize: 18 })
    this.setState({
      expandText: false,
    })
  }

  addBackgroundImage = (accepted) => {
    if (accepted && accepted.length > 0) {
      const sketch = this._sketch
      const reader = new FileReader()
      const { stretched, stretchedX, stretchedY, originX, originY } = this.state
      reader.addEventListener(
        'load',
        () =>
          sketch.setBackgroundFromDataUrl(reader.result, {
            // stretched: stretched,
            // stretchedX: stretchedX,
            // stretchedY: stretchedY,
            // originX: originX,
            // originY: originY,
          }),
        false
      )
      reader.readAsDataURL(accepted[0])

      this.setState({
        expandBackground: false,
      })
    }
  }

  render = () => {
    const isMobile = (/Mobi|Android/i.test(navigator.userAgent));

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
            onExit={this.props.onExit}
            onNotifyUsers={this.props.onNotifyUsers}
            // fullScreenHandlerDisabled={this.props.fullScreenHandlerDisabled}
            // onOpenInNewWindow={() => {
            //   const data = this._sketch.toJSON()
            //   data.sketchWidth = this._sketch.state.windowWidth
            //   data.sketchHeight = this._sketch._container.offsetHeight
            //   this.props.onOpenNewWindow(data)
            // }}

            print={() => this._sketch.print(this.props.fileName)}

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
            // getFullScreenStatus={() => {
            //   this.props.getFullScreenStatus(!this.state.fullScreen)
            // }}
            // handleFullScreen={() => {
            //   this.setState({ fullScreen: !this.state.fullScreen })
            // }}
            // fullScreen={this.state.fullScreen}
            fillColor={this.state.fillWithColor ? this.state.fillColor : 'transparent'}
            lineColor={this.state.lineColor}
            // zoomIn={() => {
            //   this._sketch.zoom(1.25)
            //   this._onSketchChange()
            // }}
            // zoomOut={() => {
            //   this._sketch.zoom(0.8)
            //   this._onSketchChange()
            // }}
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
            presentationPage={this._createNewPresentationPage}
            lineWidth={this.state.lineWidth}
            changeLineWidth={(value) => {
              this.setState({
                lineWidth: value,
              })

              if (!this.state.activeQuicklyPenID) {
                this.setState({
                  passedLineWidth: value,
                })
              }

              if (this.state.activeQuicklyPenID) {
                window.localStorage.setItem(`${this.state.activeQuicklyPenID}_width`, value)
              }
            }}
          />
          <AddTextDrawer
            open={this.state.expandText}
            handleOpen={(e) => this.setState({ expandText: !this.state.expandText })}
            changeText={(e) => this.setState({ text: e.target.value })}
            text={this.state.text}
            addText={this._addText}
          />
          <FillColor
            open={this.state.expandFillColor}
            handleOpen={(e) => this.setState({ expandFillColor: !this.state.expandFillColor })}
            color={this.state.fillWithColor ? this.state.fillColor : 'transparent'}
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
              this.setState({
                lineColor: color.hex,
              })

              if (!this.state.activeQuicklyPenID) {
                this.setState({
                  passedLineColor: color.hex,
                })
              }

              if (this.state.activeQuicklyPenID) {
                window.localStorage.setItem(`${this.state.activeQuicklyPenID}_color`, color.hex)
              }
            }}
            anchorEl={this.state.anchorEl}
          />
          {/* <BackgroundImage
            open={this.state.expandBackground}
            handleOpen={(e) => this.setState({ expandBackground: !this.state.expandBackground })}
            changeImage={(image)=> this._sketch.setBackgroundImage(image)}
            anchorEl={this.state.anchorEl}
            images={this.props.backgroundImages}
            addBackgroundImage={(img) => this.addBackgroundImage(img)}
          /> */}
          <div className='bottom sketch-area'>
            <ToolsPanel
              selectedTool={this.state.tool}
              selectTool={(tool) => this._selectTool(tool)}
              addImage={(image) => this._sketch.addImg(image)}
              addText={() =>
                this.setState({
                  expandText: true,
                })
              }
            />
            <SketchField
              name='sketch'
              className={isMobile ? 'canvas-area mobile' : 'canvas-area'}
              ref={(c) => (this._sketch = c)}
              lineColor={this.state.lineColor}
              lineWidth={this.state.lineWidth}
              fillColor={this.state.fillWithColor ? this.state.fillColor : 'transparent'}
              backgroundColor={this.state.backgroundColor}
              forceValue
              onChange={this._onSketchChange}
              tool={this.state.tool}
              defaultValue={this.state.sketchValue}
              // fullScreen={this.state.fullScreen}
              selectTool={() => this._selectTool('select')}
              selectPan={() => this._selectTool('pan')}
            />
          </div>
          <NavigationAndTabs
            addPage={() => this._sketch.addPage()}
            scrollDown={this._scrollDown}
            scrollUp={this._scrollUp}
            tabs={this.state.tabs}
            onTabClick={this.onTabClick}
            onAddTab={() => this.addTab()}
            currentTabID={this.state.currentTabID}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default SketchBoard
