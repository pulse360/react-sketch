import React from 'react'
import { ZoomIn, ZoomOut, HalfScreen, FullScreen } from '../SVG'
import AppbarButton from '../AppbarButton'
import './styles.css'

const ZoomButton = ({ zoomIn, zoomOut, fullScreen, handleFullScreen, getFullScreenStatus }) => {

  const handleClick = () => {
    handleFullScreen()
    getFullScreenStatus()
  }

  return (
    <div className='zoom-tools'>
      <AppbarButton onClick={zoomIn}>
        <ZoomIn />
      </AppbarButton>
      <AppbarButton onClick={zoomOut}>
        <ZoomOut />
      </AppbarButton>
      <AppbarButton onClick={handleClick}>{fullScreen ? <HalfScreen /> : <FullScreen />}</AppbarButton>
    </div>
  )
}

export default ZoomButton
