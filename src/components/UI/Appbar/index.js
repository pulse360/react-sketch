import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import UndoIcon from '@material-ui/icons/Undo'
import RedoIcon from '@material-ui/icons/Redo'
import DeleteIcon from '@material-ui/icons/Delete'
import SaveIcon from '@material-ui/icons/Save'
import DownloadIcon from '@material-ui/icons/CloudDownload'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import CopyIcon from '@material-ui/icons/FileCopy'
import RemoveIcon from '@material-ui/icons/Remove'
import Typography from '@material-ui/core/Typography/Typography'
import ColorLensSharpIcon from '@material-ui/icons/ColorLensSharp'
import CropOriginalSharpIcon from '@material-ui/icons/CropOriginalSharp'
import InsertPhotoSharpIcon from '@material-ui/icons/InsertPhotoSharp'
import Slider from '@material-ui/lab/Slider'

const styles = {
  backgroundColor: '#333',
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
}) => (
  <div className='row'>
    <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
      <AppBar title='Sketch Tool' position='static' style={styles}>
        <Toolbar>
          <Typography variant='h6' color='inherit'>
            Sketch Tool
          </Typography>
          <Slider
            step={1}
            min={1}
            max={100}
            aria-labelledby='slider'
            value={lineWidth}
            onChange={changeLineWidth}
            style={{ width: 200, margin: '0 50px' }}
          />
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
          <IconButton color='primary' onClick={save}>
            <SaveIcon />
          </IconButton>
          <IconButton color='primary' onClick={download}>
            <DownloadIcon />
          </IconButton>
          <IconButton color='primary' onClick={clear}>
            <DeleteIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  </div>
)

export default Appbar
