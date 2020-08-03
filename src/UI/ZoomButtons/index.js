import React from 'react'
import { ZoomIn, ZoomOut } from '../SVG'
import AppbarButton from '../AppbarButton'
import './styles.css'

const ZoomButtons = ({ zoomIn, zoomOut }) => {
  return (
    <div className='zoom-tools'>
      <AppbarButton title="Zoom In" onClick={zoomIn}>
        <ZoomIn />
      </AppbarButton>
      <AppbarButton title="Zoom Out" onClick={zoomOut}>
        <ZoomOut />
      </AppbarButton>
    </div>
  )
}

export default ZoomButtons
