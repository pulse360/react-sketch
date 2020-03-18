import React from 'react'
import './styles.css'

const LeftPanelButton = ({ children, onClick }) => (
  <button type='button' onClick={onClick} className='left-bar-button'>
    {children}
  </button>
)

export default LeftPanelButton
