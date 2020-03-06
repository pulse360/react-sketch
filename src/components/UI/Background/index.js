import React from 'react'
import { CompactPicker } from 'react-color'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import DropZone from 'react-dropzone'
import Drawer from '@material-ui/core/Drawer'

const styles = {
  dropArea: {
    width: '100%',
    height: '64px',
    border: '2px dashed rgb(102, 102, 102)',
    borderStyle: 'dashed',
    borderRadius: '5px',
    textAlign: 'center',
    paddingTop: '20px',
    cursor: 'pointer',
    marginTop: 20,
  },
  activeStyle: {
    borderStyle: 'solid',
    backgroundColor: '#eee',
  },
  rejectStyle: {
    borderStyle: 'solid',
    backgroundColor: '#ffdddd',
  },
  drawer: {
    width: '500px',
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
  },
}

const Background = ({
  open,
  handleOpen,
  fillWithBackgroundColor,
  changeFillWithBackgroundColor,
  backgroundColor,
  changeBackgroundColor,
  stretched,
  changeStretched,
  stretchedX,
  changeStretchedX,
  stretchedY,
  changeStretchedY,
  onDrop,
}) => (
  <Drawer anchor='right' open={open} onClose={handleOpen} PaperProps={{ style: styles.drawer }}>
    <FormControlLabel
      label='Background Color'
      control={<Switch value={fillWithBackgroundColor} onChange={changeFillWithBackgroundColor} />}
    />
    <CompactPicker color={backgroundColor} onChange={changeBackgroundColor} />
    <br />
    <br />
    <label htmlFor='lineColor'>Set Image Background</label>
    <br />
    <FormControlLabel label='Fit canvas (X,Y)' control={<Switch value={stretched} onChange={changeStretched} />} />
    <FormControlLabel label='Fit canvas (X)' control={<Switch value={stretchedX} onChange={changeStretchedX} />} />
    <FormControlLabel label='Fit canvas (Y)' control={<Switch value={stretchedY} onChange={changeStretchedY} />} />
    <div>
      <DropZone
        accept='image/*'
        multiple={false}
        style={styles.dropArea}
        activeStyle={styles.activeStyle}
        rejectStyle={styles.rejectStyle}
        onDrop={onDrop}
      >
        Try dropping an image here,
        <br />
        or click
        <br />
        to select image as background.
      </DropZone>
    </div>
  </Drawer>
)

export default Background
