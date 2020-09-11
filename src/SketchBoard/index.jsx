// @ts-check
/*eslint no-unused-vars: 0, no-console: 0*/
import color from '@material-ui/core/colors/blueGrey'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import { Appbar, FillColor, NavigationAndTabs, SketchField, StrokeColor, ToolsPanel } from '../'
import defaultTab from '../Constants/Tabs/defaultTab'
import TabTypes from '../Constants/Tabs/types'
import Tools from '../Constants/Tools'
import lines from '../UI/BackgroundImage/images/lines.png'
import { debounce, uuid4 } from '../utils'
import './styles.css'
import download from '../fileDownloader'

class SketchBoard extends React.Component {
  constructor(props) {
    super(props)
    const initialData = this._getInitialData(props.defaultValue)

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
      sketchValue: this._getSketchValueByTabId(initialData.tabs, initialData.currentTabID),
      currentTabID: initialData.currentTabID,
      tabs: initialData.tabs,
      activeQuicklyPenID: null,
    }
  }

  _getInitialData = (defaultValue) => {
    if (Object.keys(defaultValue).length) {
      return defaultValue
    }

    const firstTab = defaultTab
    // TODO: this can be improved
    firstTab.data['background'] = this._getBackgroundTabByType(firstTab.type)

    const initialData = {
      currentTabID: firstTab.id,
      tabs: {
        [firstTab.id]: firstTab,
      },
    }

    return initialData
  }

  _getSketchValueByTabId = (tabs, tabID) => {
    return tabs[tabID].data || {}
  }

  openPopup = (anchorEl, key) => {
    this.setState(() => ({
      anchorEl,
      [key]: !this.state[key],
    }))
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
          tabs: this._getCurrentSketchPadTabsValue(this.state.tabs),
        },
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
        data: this._sketch.saveToJSON(),
      },
    }
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

  addTab = debounce((type = TabTypes.Note, callBack) => {
    const numberOfTabs = Object.keys(this.state.tabs).length
    if (numberOfTabs === 9) {
      return
    }
    this.setState(
      ({ tabs }) => {
        const data = { background: this._getBackgroundTabByType(type) }
        const newTab = {
          type,
          data,
          order: numberOfTabs,
          id: uuid4(),
          name: `#${numberOfTabs + 1}`,
        }

        return {
          currentTabID: newTab.id,
          sketchValue: newTab.data,
          tabs: {
            ...this._getCurrentSketchPadTabsValue(tabs),
            [newTab.id]: newTab,
          },
        }
      },
      () => {
        this._clear()
        callBack && callBack()
      }
    )
  }, 300)

  _getBackgroundTabByType = (type) => {
    return type === TabTypes.Whiteboard ? 'white' : { source: lines, repeat: 'repeat' }
  }

  onTabClick = (tab) => {
    const tabs = this.state.tabs
    this.setState(
      {
        currentTabID: tabs[tab.id].id,
        sketchValue: tabs[tab.id].data,
        tabs: this._getCurrentSketchPadTabsValue(tabs),
      },
      () =>
        this.setState({
          canUndo: this._sketch.canUndo(),
          canRedo: this._sketch.canRedo(),
        })
    )
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
            print={() =>
              download({
                filename: this.props.fileName,
                tabs: this._getCurrentSketchPadTabsValue(this.state.tabs),
              })
            }
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
            fillColor={this.state.fillWithColor ? this.state.fillColor : 'transparent'}
            lineColor={this.state.lineColor}
            openPopup={this.openPopup}
            canUndo={this.state.canUndo}
            canRedo={this.state.canRedo}
            save={this._save}
            clear={this._clear}
            redo={this._redo}
            undo={this._undo}
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
          <div className='bottom sketch-area'>
            <ToolsPanel
              selectedTool={this.state.tool}
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
              defaultValue={this.state.sketchValue}
              selectTool={() => this._selectTool('select')}
              selectPan={() => this._selectTool('pan')}
            />
          </div>
          <NavigationAndTabs
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
