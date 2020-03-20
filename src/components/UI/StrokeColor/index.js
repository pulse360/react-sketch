import React from 'react'
import { CirclePicker } from 'react-color'
import { Popover } from '@material-ui/core'
import './styles.css'

const style = {
  padding: 20,
}

const StrokeColor = ({ open, handleOpen, changeColor, color, anchorEl }) => {
  const onChangeColor = (color) => {
    changeColor(color)
    handleOpen()
  }

  return (
    <Popover
      PaperProps={{ style }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      id='stroke-color'
      open={open}
      anchorEl={anchorEl}
      onClose={handleOpen}
      transition
    >
      <label htmlFor='strokeColor' className='stroke-color__label'>
        Line color
      </label>
      <CirclePicker id='strokeColor' color={color} onChange={onChangeColor} />
    </Popover>
  )
}

export default StrokeColor