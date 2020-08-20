import React from 'react'
import './styles.css'
import Tappable from 'react-tappable'
import { Tooltip } from '@material-ui/core'

const LeftPanelButton = ({ children, onClick, selectedTool, tool = null, title='' }) => {
  return (
    <Tappable onTap={onClick}>
        <Tooltip title={title} arrow disableFocusListener placement="right" >
          <button
            type='button'
            className={`left-bar-button ${selectedTool === tool ? 'left-bar-button__active' : ''}`}
          >
            {children}
          </button>
      </Tooltip>
    </Tappable>
  )
}

export default LeftPanelButton
