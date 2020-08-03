import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import AddAlertIcon from '@material-ui/icons/AddAlert'
// import IconButton from '@material-ui/core/IconButton'
// import CopyIcon from '@material-ui/icons/FileCopy'
import {
  SaveButtons,
  HistoryButtons,
  ColorButtons,
  ZoomButtons,
  Slider,
  QuicklyPencils,
  WindowModeButtons,
} from '../../'

import './styles.css'

const addAlertStyles = {
  outline: 'none',
  position: 'absolute',
  right: '15px',
  top: '60px',
  width: '50px',
  zIndex: 100,
}

const styles = {
  backgroundColor: '#F6F7FB',
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
  colorsOpen,
  backgroundOpen,
  lineWidth,
  changeLineWidth,
  setAnchorEl,
  openPopup,
  zoomIn,
  zoomOut,
  fillColor,
  lineColor,
  fullScreen,
  handleFullScreen,
  getFullScreenStatus,
  changeActiveQuicklyPenID,
  selectQuicklyPen,
  activeQuicklyPenID,
  print,
  onOpenInNewWindow,
  fullScreenHandlerDisabled,
  onNotifyUsers
}) => (
    <div style={styles}>
      <IconButton onClick={onNotifyUsers} style={addAlertStyles} color='primary' onсlick >
        <AddAlertIcon />
      </IconButton>
      <SaveButtons save={save} clear={clear} print={print} />
      <HistoryButtons undo={undo} redo={redo} canRedo={canRedo} canUndo={canUndo} />
      <Slider value={lineWidth} onChange={changeLineWidth} />
      <QuicklyPencils
        changeActiveQuicklyPenID={changeActiveQuicklyPenID}
        selectQuicklyPen={(color, width) => selectQuicklyPen(color, width)}
        activeQuicklyPenID={activeQuicklyPenID}
      />
      <ColorButtons setAnchorEl={setAnchorEl} open={openPopup} fillColor={fillColor} lineColor={lineColor} />
      {/* <IconButton color='primary' disabled={enableCopyPaste} onClick={copyPasteClick}>
      <CopyIcon />
    </IconButton> */}
      <ZoomButtons zoomIn={zoomIn} zoomOut={zoomOut} />
      <WindowModeButtons
        fullScreen={fullScreen}
        handleFullScreen={handleFullScreen}
        getFullScreenStatus={getFullScreenStatus}
        onOpenInNewWindow={onOpenInNewWindow}
        fullScreenHandlerDisabled={fullScreenHandlerDisabled}
      />
    </div>
  )

export default Appbar
