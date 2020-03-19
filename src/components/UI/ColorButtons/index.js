import React from 'react'
import { FillColorIcon, StrokeColorIcon, BackgroundImage } from '../SVG'
import AppbarButton from '../AppbarButton'
import './styles.css'

const ColorButtons = ({ setAnchorEl, open, fillColor, lineColor }) => {
  const handleClick = (event, key) => {
    setAnchorEl(event)
    open(key)
  }

  return (
    <div className='color-tools'>
      <AppbarButton onClick={(event) => handleClick(event, 'expandFillColor')}>
        {fillColor !== 'transparent' && (
          <div className='color-tools__color-indicator' style={{ backgroundColor: fillColor }}></div>
        )}
        <FillColorIcon />
      </AppbarButton>
      <AppbarButton onClick={(event) => handleClick(event, 'expandStrokeColor')}>
        <div className='color-tools__color-indicator' style={{ backgroundColor: lineColor }}></div>
        <StrokeColorIcon />
      </AppbarButton>
      <AppbarButton onClick={(event) => handleClick(event, 'expandBackground')}>
        <BackgroundImage />
      </AppbarButton>
    </div>
  )
}

export default ColorButtons
