import React from 'react'
import UndoIcon from '@material-ui/icons/Undo'
import RedoIcon from '@material-ui/icons/Redo'
import DeleteIcon from '@material-ui/icons/Delete'
import DownloadIcon from '@material-ui/icons/CloudDownload'
import IconButton from '@material-ui/core/IconButton'
import CopyIcon from '@material-ui/icons/FileCopy'
import RemoveIcon from '@material-ui/icons/Remove'
import ColorLensSharpIcon from '@material-ui/icons/ColorLensSharp'
import CropOriginalSharpIcon from '@material-ui/icons/CropOriginalSharp'
import InsertPhotoSharpIcon from '@material-ui/icons/InsertPhotoSharp'
import { SaveTools, HistoryTools, ColorTools } from '../../'

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
  enableRemoveSelected,
  removeSelected,
  copyPasteClick,
  toolsOpen,
  colorsOpen,
  backgroundOpen,
  imagesOpen,
  lineWidth,
  changeLineWidth,
  setAnchorEl,
  openPopup,
}) => (
  <div style={styles}>
    <SaveTools save={save} clear={clear} />
    <HistoryTools undo={undo} redo={redo} canRedo={canRedo} canUndo={canUndo} />
    <ColorTools setAnchorEl={setAnchorEl} open={openPopup} />
    <IconButton color='primary' onClick={toolsOpen}>
      <CopyIcon />
    </IconButton>
    <IconButton color='primary' onClick={imagesOpen}>
      <InsertPhotoSharpIcon />
    </IconButton>
    <IconButton color='primary' onClick={colorsOpen}>
      <ColorLensSharpIcon />
    </IconButton>
    <IconButton color='primary' onClick={backgroundOpen}>
      <CropOriginalSharpIcon />
    </IconButton>
    <IconButton color='primary' disabled={enableCopyPaste} onClick={copyPasteClick}>
      <CopyIcon />
    </IconButton>
    <IconButton color='primary' disabled={enableRemoveSelected} onClick={removeSelected}>
      <RemoveIcon />
    </IconButton>
    <IconButton color='primary' disabled={!canUndo} onClick={undo}>
      <UndoIcon />
    </IconButton>
    <IconButton color='primary' disabled={!canRedo} onClick={redo}>
      <RedoIcon />
    </IconButton>
    {/* <IconButton color='primary' onClick={save}>
      <SaveIcon />
    </IconButton> */}
  </div>
)

export default Appbar
