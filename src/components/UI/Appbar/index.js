import React from 'react'
import IconButton from '@material-ui/core/IconButton'
// import CopyIcon from '@material-ui/icons/FileCopy'
import { SaveButtons, HistoryButtons, ColorButtons, ZoomButtons, Slider } from '../../'

const styles = {
  backgroundColor: '#F6F7FB',
  padding: 0,
  padding: '0 10px',
  height: 61,
  display: 'flex',
  alignItems: 'center',
}

const Appbar = ({
  canUndo,
  canRedo,
  save,
  download,
  clear,
  redo,
  undo,
  enableCopyPaste,
  copyPasteClick,
  toolsOpen,
  colorsOpen,
  backgroundOpen,
  lineWidth,
  changeLineWidth,
  setAnchorEl,
  openPopup,
  selectTool,
  zoomIn,
  zoomOut,
  fillColor,
  lineColor,
  fullScreen,
  handleFullScreen,
}) => (
  <div style={styles}>
    <SaveButtons save={save} clear={clear} />
    <HistoryButtons undo={undo} redo={redo} canRedo={canRedo} canUndo={canUndo} />
    <Slider value={lineWidth} onChange={changeLineWidth} />
    <ColorButtons setAnchorEl={setAnchorEl} open={openPopup} fillColor={fillColor} lineColor={lineColor} />
    <IconButton color='primary' onClick={toolsOpen}>
      Add text
    </IconButton>
    <IconButton color='primary' onClick={() => selectTool('select')}>
      Select
    </IconButton>
    {/* <IconButton color='primary' disabled={enableCopyPaste} onClick={copyPasteClick}>
      <CopyIcon />
    </IconButton> */}
    <ZoomButtons zoomIn={zoomIn} zoomOut={zoomOut} fullScreen={fullScreen} handleFullScreen={handleFullScreen} />
  </div>
)

export default Appbar
