import React from 'react'
import './styles.css'

const AppbarButton = ({ children, onClick, disabled }) => (
  <button type='button' onClick={onClick} className='appbar-button' disabled={disabled}>
    {children}
  </button>
)

export default AppbarButton
