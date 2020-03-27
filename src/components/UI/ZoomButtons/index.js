import React from 'react'
import { ZoomIn, ZoomOut, HalfScreen, FullScreen, OpenNewWindowIcon } from '../SVG'
import AppbarButton from '../AppbarButton'
import './styles.css'

const ZoomButtons = ({ zoomIn, zoomOut, fullScreen, handleFullScreen, getFullScreenStatus, onOpenInNewWindow }) => {
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
      <AppbarButton onClick={onOpenInNewWindow}>
        <OpenNewWindowIcon />
      </AppbarButton>
      <AppbarButton onClick={handleClick}>{fullScreen ? <HalfScreen /> : <FullScreen />}</AppbarButton>
    </div>
  )
}

export default ZoomButtons
