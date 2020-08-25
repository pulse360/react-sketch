/*eslint no-unused-vars: 0, no-console: 0*/

import React from 'react'
import 'flexboxgrid'
import './styles.css'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import color from '@material-ui/core/colors/blueGrey'
import { SketchField, Appbar, AddTextDrawer, FillColor, BackgroundImage, ToolsPanel, StrokeColor } from '../'
import Tools from '../Tools'
import fileDownloader from '../fileDownloader'

class SketchBoard extends React.Component {
  constructor(props) {
    super(props)
    this.scrollAreaRef = React.createRef();

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
    const data = this._sketch.toJSON()
    data.sketchWidth = this._sketch.state.windowWidth
    data.sketchHeight = this._sketch._container.offsetHeight
    data.heightFactor = this._sketch.state.heightFactor
    data.prevAspectRatio = this._sketch.state.windowAspectRatio
    this.props.onSaveCanvas(
      {
        data,
        heightFactor: data.heightFactor
      },
      withClose
    )
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
    this._sketch.clearHeightFactor()
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

  _scrollUp = () =>{
    const currentScroll= this._sketch._container.scrollTop || 0
    let nextScrollPosition = currentScroll-350
    if(nextScrollPosition<0) nextScrollPosition=0
    this._sketch._container.scrollTo(0, nextScrollPosition)   
  }
  
  _scrollDown = () =>{  
    const currentScroll= this._sketch._container.scrollTop || 0
    const nextScrollPosition =  currentScroll+350
    
    // if(nextScrollPosition+350>currentMaxScroll){
    //   this._sketch.addPage()
    // }
    this._sketch._container.scrollTo(0, nextScrollPosition)

  }

  // addTab = () => {
  //   if (this.state.tabs.length === 9) {
  //     return
  //   }

  //   this.setState(({ tabs }) => {
  //     const newTabID = `tab_${tabs.length + 1}`

  //     const newTab = {
  //       data: [],
  //       id: newTabID,
  //       name: `Tab #${tabs.length + 1}`,
  //     }

  //     return { tabs: [...tabs, newTab], currentTabID: newTabID, sketchValue: [] }
  //   })
  // }

  // onTabClick = (tab) => {
  //   this.setState(({ tabs }) => {
  //     const indx = tabs.findIndex((el) => el.id === tab.id)
  //     return {
  //       currentTabID: tab.id,
  //       sketchValue: tabs[indx].data,
  //     }
  //   })
  // }

  _onSketchChange = () => {
    // this.setState(({ tabs, currentTabID }) => {
    //   const indx = tabs.findIndex((el) => el.id === currentTabID)
    //   const newItem = { ...tabs[indx], data: JSON.stringify(this._sketch.toJSON()) }
    //   return { tabs: [...tabs.slice(0, indx), newItem, ...tabs.slice(indx + 1)] }
    // })

    let prev = this.state.canUndo
    let now = this._sketch.canUndo()
    if (prev !== now) {
      this.setState({ canUndo: now })
    }
  }

  _calculateInitialHeightFactor = () => {
   /*  const wrapperElement= document.querySelector('body') || document
    const isVertical = wrapperElement.clientHeight > wrapperElement.clientWidth;
    if(isVertical){
      let numberOfPagesNecessary = 3;
      while(wrapperElement.clientWidth*numberOfPagesNecessary < wrapperElement.clientHeight+100){
        numberOfPagesNecessary++
      }
      return numberOfPagesNecessary
    } */
    return 1
  }
  
  _onBackgroundImageDrop = (imageUrl) => {
    let sketch = this._sketch
    sketch.setBackgroundImage(imageUrl, {})
  }

  _addText = () => {
    this._selectTool('select')
    this._sketch.addText(this.state.text, { fontSize: 18 })
    this.setState({
      expandText: false,
    })
  }

  /**
   * exports the current canvas as a pdf or print dialog
   */
  _print = () => {
    const dateTime =
      'D' +
      new Date().toLocaleDateString() +
      ' T' +
      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(/:/gm, '-')
    
    const filename = dateTime + ' - exported notes'
    const amountOfPages = this._sketch.state.heightFactor
    const pageWidth = this._sketch.state.windowWidth
    const pageHeight = pageWidth * this._sketch.state.windowAspectRatio

    const images = []
    for (let page = 0; page < amountOfPages; page++) {
      const opts = {
        format: 'jpeg',
        quality: 0.8,
        top: page * pageHeight,
        height: pageHeight,
        width: pageWidth
      }
      images.push(this._sketch.toDataURL(opts))
    }
    fileDownloader({filename, images})
  }

  componentDidMount = () => {
    (function (console) {
      console.save = function (data, filename) {
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

  addBackgroundImage = (accepted) => {
    if (accepted && accepted.length > 0) {
      let sketch = this._sketch
      let reader = new FileReader()
      let { stretched, stretchedX, stretchedY, originX, originY } = this.state
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
            fullScreenHandlerDisabled={this.props.fullScreenHandlerDisabled}
            onOpenInNewWindow={() => {
              const data = this._sketch.toJSON()
              data.sketchWidth = this._sketch.state.windowWidth
              data.sketchHeight = this._sketch._container.offsetHeight

              this.props.onOpenNewWindow(data)
            }}
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
            getFullScreenStatus={() => {
              this.props.getFullScreenStatus(!this.state.fullScreen)
            }}
            handleFullScreen={() => {
              this.setState({ fullScreen: !this.state.fullScreen })
              setTimeout(() => {
                this._sketch._resize()
              }, 10)
            }}
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
          <BackgroundImage
            open={this.state.expandBackground}
            handleOpen={(e) => this.setState({ expandBackground: !this.state.expandBackground })}
            changeImage={this._onBackgroundImageDrop}
            anchorEl={this.state.anchorEl}
            images={this.props.backgroundImages}
            addBackgroundImage={(img) => this.addBackgroundImage(img)}
          />
          <div className='bottom' ref={this.scrollAreaRef}>
            <ToolsPanel
              selectTool={(tool) => this._selectTool(tool)}
              addImage={(image) => this._sketch.addImg(image)}
              addText={() =>
                this.setState({
                  expandText: true,
                })
              }
              addPage={()=>this._sketch.addPage()}
              scrollDown={this._scrollDown}
              scrollUp={this._scrollUp}
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
              defaultValue={this.props.defaultValue}
              defaultHeightFactor={this.props.defaultValue.heightFactor || this._calculateInitialHeightFactor()}
              fullScreen={this.state.fullScreen}
              selectTool={() => this._selectTool('select')}
              selectPan={() => this._selectTool('pan')}
              prevDeviceWidth={ this.props.defaultValue.sketchWidth}
              prevDeviceHeight={ this.props.defaultValue.sketchHeight}
              prevAspectRatio={ this.props.defaultValue.prevAspectRatio}
              parentContainerWidth={this.props.parentContainerWidth}
            />
          </div>
          {/* <Tabs
            tabs={this.state.tabs}
            onTabClick={this.onTabClick}
            onAddTab={this.addTab}
            currentTabID={this.state.currentTabID}
          />  */}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default SketchBoard
