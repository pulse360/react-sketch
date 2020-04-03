import React from 'react'
import { CirclePicker } from 'react-color'
import { Popover, FormControlLabel, Switch } from '@material-ui/core'
import './styles.css'
import { FillColorIcon } from '../SVG'

const style = {
  padding: 20,
  borderTopLeftRadius: 0,
  overflowY: 'visible',
  overflowX: 'visible',
}

const FillColor = ({ open, handleOpen, changeColor, color, anchorEl, onFillWithColorChange, fillWithColor }) => {
  const onChangeColor = (color) => {
    changeColor(color)
    onFillWithColorChange(true)
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
      BackdropProps={{
        backgroundColor: 'black',
      }}
      id='fill-color'
      open={open}
      anchorEl={anchorEl}
      onClose={handleOpen}
      transition
    >
      <>
        <div className='fill__color-indicator-wrapper'>
          {color !== 'transparent' && (
            <div className='fill-color__color-indicator' style={{ backgroundColor: color }}></div>
          )}
          <FillColorIcon />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <label htmlFor='lineColor' className='fill-color__label'>
            Fill color
          </label>
          <FormControlLabel
            style={{ margin: 0 }}
            label='Transparent'
            control={<Switch checked={!fillWithColor} onChange={() => onFillWithColorChange(!fillWithColor)} />}
          />
        </div>
      </>
      <CirclePicker id='lineColor' color={color} onChange={onChangeColor} />
    </Popover>
  )
}

export default FillColor
