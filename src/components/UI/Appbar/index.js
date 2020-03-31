import React from 'react'
import IconButton from '@material-ui/core/IconButton'
// import CopyIcon from '@material-ui/icons/FileCopy'
import { SaveButtons, HistoryButtons, ColorButtons, ZoomButtons, Slider, QuicklyPencils } from '../../'

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
  fullScreenHandlerDisabled
}) => (
  <div style={styles}>
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
    <ZoomButtons
      zoomIn={zoomIn}
      zoomOut={zoomOut}
      fullScreen={fullScreen}
      handleFullScreen={handleFullScreen}
      getFullScreenStatus={getFullScreenStatus}
      onOpenInNewWindow={onOpenInNewWindow}
      fullScreenHandlerDisabled={fullScreenHandlerDisabled}
    />
  </div>
)

export default Appbar
