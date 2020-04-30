import React from 'react'
import './styles.css'
import Tappable from 'react-tappable'

const AppbarButton = ({ children, onClick, disabled }) => (
  <button type='button' onclick onClick={onClick} className='appbar-button' disabled={disabled}>
    {/* <Tappable onTap={onClick}> */}
    {children}
    {/* </Tappable> */}
  </button>
)

export default AppbarButton
