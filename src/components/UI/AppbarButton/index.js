import React from 'react'
import './styles.css'

const AppbarButton = ({ children, onClick, disabled, id }) => (
  <button type='button' onClick={onClick} className='appbar-button' disabled={disabled} id={id}>
    {children}
  </button>
)

export default AppbarButton
