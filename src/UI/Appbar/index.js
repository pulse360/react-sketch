/* eslint-disable no-unused-vars */
import React from 'react'
import { ColorButtons, HistoryButtons, QuicklyPencils, SaveButtons, Slider } from '../../'
import StyledButton from '../StyledButton'
import { SlideshowIcon } from '../SVG'
import './styles.css'

const styles = {
  backgroundColor: '#F6F7FB',
  padding: '10px 10px',
  display: 'flex',
  alignItems: 'center',
}

const Appbar = ({
  canUndo,
  canRedo,
  save,
  onExit,
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
  presentationPage,
}) => (
  <div style={styles}>
    <SaveButtons save={save} exit={onExit} print={print} notify={onNotifyUsers} />
    <HistoryButtons clear={clear} undo={undo} redo={redo} canRedo={canRedo} canUndo={canUndo} />
    <Slider value={lineWidth} onChange={changeLineWidth} />
    <QuicklyPencils
      changeActiveQuicklyPenID={changeActiveQuicklyPenID}
      selectQuicklyPen={(color, width) => selectQuicklyPen(color, width)}
      activeQuicklyPenID={activeQuicklyPenID}
    />
    <ColorButtons setAnchorEl={setAnchorEl} open={openPopup} fillColor={fillColor} lineColor={lineColor} />
    <StyledButton title='Create a Whiteboard Page' onClick={presentationPage} style={{ marginLeft: '10px' }}>
      <SlideshowIcon />
    </StyledButton>
  </div>
)

export default Appbar
