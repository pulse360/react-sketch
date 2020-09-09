import React from 'react'
import ColorSelector from '../ColorSelector'
import { Popover } from '@material-ui/core'
import './styles.css'
import { StrokeColorIcon } from '../SVG'

const style = {
  padding: 20,
  overflowY: 'visible',
  overflowX: 'visible',
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
        horizontal: 40,
      }}
      BackdropProps={{
        backgroundColor: 'black',
      }}
      id='stroke-color'
      open={open}
      anchorEl={anchorEl}
      onClose={handleOpen}
      transition
    >
      <div className='stroke-color-indicator-wrapper'>
          {color !== 'transparent' && (
            <div className='stroke-color__color-indicator' style={{ backgroundColor: color }}></div>
          )}
          <StrokeColorIcon />
        </div>
        <label htmlFor='strokeColor' className='stroke-color__label'>
          Line color
        </label>
        <ColorSelector selected={color} onChangeColor={onChangeColor}/>
    </Popover>
  )
}

export default StrokeColor
