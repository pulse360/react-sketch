import React from 'react'
import { ZoomIn, ZoomOut } from '../SVG'
import StyledButton from '../StyledButton'
import './styles.css'

const ZoomButtons = ({ zoomIn, zoomOut }) => {
  return (
    <div className='zoom-tools'>
      <StyledButton title="Zoom In" onClick={zoomIn}>
        <ZoomIn />
      </StyledButton>
      <StyledButton title="Zoom Out" onClick={zoomOut}>
        <ZoomOut />
      </StyledButton>
    </div>
  )
}

export default ZoomButtons
