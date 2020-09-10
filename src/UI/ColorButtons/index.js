import React from 'react'
import { FillColorIcon, StrokeColorIcon } from '../SVG'
import StyledButton from '../StyledButton'
import './styles.css'

const ColorButtons = ({ openPopup, fillColor, lineColor }) => {
  return (
    <div className='color-tools'>
      <StyledButton title="Fill Color" onClick={(event) => openPopup(event.currentTarget, 'expandFillColor')}>
        {fillColor !== 'transparent' && (
          <div className='color-tools__color-indicator' style={{ backgroundColor: fillColor }}></div>
        )}
        <FillColorIcon />
      </StyledButton>
      <StyledButton title="Stroke Color" onClick={(event) => openPopup(event.currentTarget, 'expandStrokeColor')}>
        <div className='color-tools__color-indicator' style={{ backgroundColor: lineColor }}></div>
        <StrokeColorIcon />
      </StyledButton>
    </div>
  )
}

export default ColorButtons
