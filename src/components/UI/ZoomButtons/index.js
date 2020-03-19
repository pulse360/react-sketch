import React from 'react'
import { ZoomIn, ZoomOut, Fullscreen, SelectIcon } from '../SVG'
import AppbarButton from '../AppbarButton'
import './styles.css'

const ZoomButton = ({ zoomIn, zoomOut, selectTool }) => {
  return (
    <div className='zoom-tools'>
      <AppbarButton onClick={zoomIn}>
        <ZoomIn />
      </AppbarButton>
      <AppbarButton onClick={zoomOut}>
        <ZoomOut />
      </AppbarButton>
      <AppbarButton onClick={selectTool}>
        <SelectIcon />
      </AppbarButton>
      <AppbarButton>
        <Fullscreen />
      </AppbarButton>
    </div>
  )
}

export default ZoomButton
