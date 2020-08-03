import React from 'react'
import { FillColorIcon, StrokeColorIcon, BackgroundImageIcon } from '../SVG'
import AppbarButton from '../AppbarButton'
import './styles.css'

const ColorButtons = ({ setAnchorEl, open, fillColor, lineColor }) => {
  const handleClick = (event, key) => {
    setAnchorEl(event)
    open(key)
  }

  return (
    <div className='color-tools'>
      <AppbarButton title="Fill Color" onClick={(event) => handleClick(event, 'expandFillColor')}>
        {fillColor !== 'transparent' && (
          <div className='color-tools__color-indicator' style={{ backgroundColor: fillColor }}></div>
        )}
        <FillColorIcon />
      </AppbarButton>
      <AppbarButton title="Stroke Color" onClick={(event) => handleClick(event, 'expandStrokeColor')}>
        <div className='color-tools__color-indicator' style={{ backgroundColor: lineColor }}></div>
        <StrokeColorIcon />
      </AppbarButton>
      <AppbarButton title="Background Image" onClick={(event) => handleClick(event, 'expandBackground')}>
        <BackgroundImageIcon />
      </AppbarButton>
    </div>
  )
}

export default ColorButtons
