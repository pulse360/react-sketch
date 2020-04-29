import React from 'react'
import './styles.css'
import Tappable from 'react-tappable'

const AppbarButton = ({ children, onClick, disabled }) => (
  <Tappable onTap={onClick}>
    <button type='button' onclick onClick={onClick} className='appbar-button' disabled={disabled}>
      {children}
    </button>
  </Tappable>
)

export default AppbarButton
