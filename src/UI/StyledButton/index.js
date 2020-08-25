import React from 'react'
import './styles.css'
import Tappable from 'react-tappable'
import { Tooltip } from '@material-ui/core'

const StyledButton = ({ children, onClick, selectedTool, disabled, tool = null, navigationBar = false, title='', style={}, tooltipPlacement="bottom" }) => {
  const darkButton = tool || navigationBar
  const className = darkButton ? `${selectedTool === tool ? 'left-bar-button left-bar-button__active' : 'left-bar-button'}`: 'appbar-button'
  const tooltipPlace =  tool ? "right" : tooltipPlacement 
  const customStyling = disabled ? { pointerEvents: "none", ...style } : style
  
  return (
    <Tappable onTap={onClick}>
        <Tooltip title={title} arrow disableFocusListener placement={tooltipPlace} style={customStyling}>
          <button type='button' className={className} disabled={disabled}>
            {children}
          </button>
      </Tooltip>
    </Tappable>
  )
}

export default StyledButton
