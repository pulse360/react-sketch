import React from 'react'
import { HalfScreen, FullScreen, OpenNewWindowIcon } from '../SVG'
import AppbarButton from '../AppbarButton'
import './styles.css'

const WindowModeButtons = ({
  fullScreen,
  handleFullScreen,
  getFullScreenStatus,
  onOpenInNewWindow,
  fullScreenHandlerDisabled,
}) => {
  const handleClick = () => {
    handleFullScreen()
    getFullScreenStatus()
  }

  return (
    <div className='window-mode-tools'>
      <AppbarButton onClick={onOpenInNewWindow} disabled={fullScreenHandlerDisabled}>
        <OpenNewWindowIcon />
      </AppbarButton>
      <AppbarButton onClick={handleClick} disabled={fullScreenHandlerDisabled}>
        {fullScreen ? <HalfScreen /> : <FullScreen />}
      </AppbarButton>
    </div>
  )
}

export default WindowModeButtons
