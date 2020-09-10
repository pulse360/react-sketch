import React from 'react'
import ColorSelector from '../ColorSelector'
import { Popover, FormControlLabel, Switch } from '@material-ui/core'
import './styles.css'
import { FillColorIcon } from '../SVG'

const style = {
  padding: 20,
  borderTopRightRadius: 0,
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
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
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
      <div className='fill__color-indicator-wrapper'>
        {color !== 'transparent' && (
          <div className='fill-color__color-indicator' style={{ backgroundColor: color }}></div>
        )}
        <FillColorIcon />
      </div>
      <div className='fill__color-wrapper' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop:'-15px' }}>
        <label htmlFor='lineColor' className='fill-color__label'>
          Fill color
        </label>
        <FormControlLabel
          onсlick
          style={{ margin: 0 }}
          label='Transparent'
          control={<Switch checked={!fillWithColor} onChange={() => onFillWithColorChange(!fillWithColor)} />}
        />
      </div>
      <ColorSelector selected={color} onChangeColor={onChangeColor}/>
    </Popover>
  )
}

export default FillColor
