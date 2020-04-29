import React from 'react'
import './styles.css'
import Tappable from 'react-tappable'

const LeftPanelButton = ({ children, onClick, selectedTool, tool = null }) => {
  return (
    <Tappable onTap={onClick}>
      <button
        type='button'
        onClick={onClick}
        onTouchStart={onClick}
        onclick
        className={`left-bar-button ${selectedTool === tool ? 'left-bar-button__active' : ''}`}
      >
        {children}
      </button>
    </Tappable>
  )
}

export default LeftPanelButton
