import React from 'react'
import { FillColorIcon, StrokeColorIcon } from '../SVG'
import StyledButton from '../StyledButton'
import './styles.css'

const ColorButtons = ({ setAnchorEl, open, fillColor, lineColor }) => {
  const handleClick = (event, key) => {
    setAnchorEl(event)
    open(key)
  }

  return (
    <div className='color-tools'>
      <StyledButton title="Fill Color" onClick={(event) => handleClick(event, 'expandFillColor')}>
        {fillColor !== 'transparent' && (
          <div className='color-tools__color-indicator' style={{ backgroundColor: fillColor }}></div>
        )}
        <FillColorIcon />
      </StyledButton>
      <StyledButton title="Stroke Color" onClick={(event) => handleClick(event, 'expandStrokeColor')}>
        <div className='color-tools__color-indicator' style={{ backgroundColor: lineColor }}></div>
        <StrokeColorIcon />
      </StyledButton>
    </div>
  )
}

export default ColorButtons
