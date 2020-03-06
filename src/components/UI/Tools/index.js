import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import AddIcon from '@material-ui/icons/Add'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'
import Tools from '../../Tools'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Slider from '@material-ui/lab/Slider'
import Typography from '@material-ui/core/Typography/Typography'
import Drawer from '@material-ui/core/Drawer'

const styles = {
  margin: '10px 10px 5px 0',
}

const ToolsComponent = ({
  open,
  handleOpen,
  value,
  handleChange,
  lineWidth,
  changeLineWidth,
  zoomIn,
  zoomOut,
  changeText,
  text,
  addText,
}) => (
  <Drawer anchor='right' open={open} onClose={handleOpen}>
    <Typography id='slider'>Line Weight</Typography>
    <div className='row'>
      <div className='col-lg-7'>
        <TextField label='Text' helperText='Add text to Sketch' onChange={changeText} value={text} />
      </div>
      <div className='col-lg-3'>
        <IconButton color='primary' onClick={addText}>
          <AddIcon />
        </IconButton>
      </div>
    </div>
  </Drawer>
)

export default ToolsComponent
