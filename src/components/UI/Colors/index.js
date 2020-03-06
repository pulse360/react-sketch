import React from 'react'
import { CirclePicker } from 'react-color'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Switch, Drawer } from '@material-ui/core'

const style = {
  width: '500px',
  display: 'flex',
  alignItems: 'center',
  padding: '20px',
}

const Colors = ({
  open,
  handleOpen,
  changeLineColor,
  lineColor,
  fillWithColor,
  changeFillWithColor,
  fillColor,
  changeFillColor,
}) => {
  return (
    <Drawer anchor='right' open={open} onClose={handleOpen} PaperProps={{ style }}>
      <label htmlFor='lineColor'>Line</label>
      <CirclePicker id='lineColor' color={lineColor} onChange={changeLineColor} />
      <FormControlLabel
        control={<Switch checked={fillWithColor} value={fillWithColor} onChange={changeFillWithColor} />}
        label='Fill'
      />
      <CirclePicker color={fillColor} onChange={changeFillColor} />
    </Drawer>
  )
}

export default Colors
