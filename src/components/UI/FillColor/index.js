import React from 'react'
import { CirclePicker } from 'react-color'
import { Popover } from '@material-ui/core'

const FillColor = ({ open, handleOpen, changeColor, color, anchorEl }) => {
  return (
    <Popover
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      id='fill-color'
      open={open}
      anchorEl={anchorEl}
      onClose={handleOpen}
      transition
    >
      <label htmlFor='lineColor'>Line</label>
      <CirclePicker id='lineColor' color={color} onChange={changeColor} />
    </Popover>
  )
}

export default FillColor
