import { Tooltip } from '@material-ui/core'
import React from 'react'
import './styles.css'

const StyledButton = ({
  children,
  onClick,
  selectedTool,
  disabled,
  tool = null,
  navigationBar = false,
  title = '',
  style = {},
  tooltipPlacement = 'bottom',
}) => {
  const darkButton = tool || navigationBar
  const className = darkButton
    ? `${selectedTool === tool ? 'left-bar-button left-bar-button__active' : 'left-bar-button'}`
    : 'appbar-button'
  const tooltipPlace = tool ? 'right' : tooltipPlacement
  const customStyling = disabled ? { pointerEvents: 'none', ...style } : style

  return (
      <Tooltip title={title} arrow disableFocusListener placement={tooltipPlace} style={customStyling}>
        <button 
          type='button' 
          className={className} 
          disabled={disabled}
          onClick={onClick}
          onTouchStart={onClick}
        >
          {children}
        </button>
      </Tooltip>
  )
}

export default StyledButton
