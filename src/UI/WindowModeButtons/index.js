import React from 'react'
import { HalfScreen, FullScreen, OpenNewWindowIcon } from '../SVG'
import StyledButton from '../StyledButton'
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
      <StyledButton title="Open in a new Window" onClick={onOpenInNewWindow} disabled={fullScreenHandlerDisabled}>
        <OpenNewWindowIcon />
      </StyledButton>
      <StyledButton title="Open in fullscreen" onClick={handleClick} disabled={fullScreenHandlerDisabled}>
        {fullScreen ? <HalfScreen /> : <FullScreen />}
      </StyledButton>
    </div>
  )
}

export default WindowModeButtons
