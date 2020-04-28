import React from 'react'
import './styles.css'

const LeftPanelButton = ({ children, onClick, selectedTool, tool = null }) => {
  return (
    <button
      type='button'
      onClick={onClick}
      onTouchStart={onClick}
      className={`left-bar-button ${selectedTool === tool ? 'left-bar-button__active' : ''}`}
    >
      {children}
    </button>
  )
}

export default LeftPanelButton
