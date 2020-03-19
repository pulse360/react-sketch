import React from 'react'
import { CirclePicker } from 'react-color'
import { Popover } from '@material-ui/core'
import './styles.css'

const style = {
  padding: 20,
}

const BackgroundImage = ({ open, handleOpen, anchorEl, changeColor, color }) => {
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
      id='fill-color'
      open={open}
      anchorEl={anchorEl}
      onClose={handleOpen}
      transition
    >
      <label htmlFor='lineColor' className='background-image__label'>
        Background image
      </label>
      <CirclePicker id='lineColor' color={color} onChange={onChangeColor} />
    </Popover>
  )
}

export default BackgroundImage
