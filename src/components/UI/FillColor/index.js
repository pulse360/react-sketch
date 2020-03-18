import React from 'react'
import { CirclePicker } from 'react-color'
import { Popover, FormControlLabel, Switch } from '@material-ui/core'

const style = {
  padding: 20,
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
      id='fill-color'
      open={open}
      anchorEl={anchorEl}
      onClose={handleOpen}
      transition
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <label htmlFor='lineColor'>Fill</label>
        <FormControlLabel
          style={{ margin: 0 }}
          label='Transparent'
          control={<Switch checked={!fillWithColor} onChange={() => onFillWithColorChange(!fillWithColor)} />}
        />
      </div>
      <CirclePicker id='lineColor' color={color} onChange={onChangeColor} />
    </Popover>
  )
}

export default FillColor
