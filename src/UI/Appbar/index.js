/* eslint-disable no-unused-vars */
import React from 'react'
import AppbarButton from '../AppbarButton'
import NotifyIcon from '../SVG/notify'

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
  onNotifyUsers,
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
    <ZoomButtons zoomIn={zoomIn} zoomOut={zoomOut} />
    <WindowModeButtons
      fullScreen={fullScreen}
      handleFullScreen={handleFullScreen}
      getFullScreenStatus={getFullScreenStatus}
      onOpenInNewWindow={onOpenInNewWindow}
      fullScreenHandlerDisabled={fullScreenHandlerDisabled}
    />

    <AppbarButton title='Alert Team Members' onClick={onNotifyUsers} style={{ marginLeft: '20px', color: '#20A0FF' }}>
      <NotifyIcon />
    </AppbarButton>
  </div>
)

export default Appbar
