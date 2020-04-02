import React from 'react'
import { ZoomIn, ZoomOut } from '../SVG'
import AppbarButton from '../AppbarButton'
import './styles.css'

const ZoomButtons = ({ zoomIn, zoomOut }) => {
  return (
    <div className='zoom-tools'>
      <AppbarButton onClick={zoomIn}>
        <ZoomIn />
      </AppbarButton>
      <AppbarButton onClick={zoomOut}>
        <ZoomOut />
      </AppbarButton>
    </div>
  )
}

export default ZoomButtons
