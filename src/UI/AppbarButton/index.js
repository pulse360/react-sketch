import React from 'react'
import './styles.css'
import { Tooltip } from '@material-ui/core'
// import Tappable from 'react-tappable'

const AppbarButton = ({ children, onClick, disabled, title='' }) => (
  <Tooltip title={title} arrow>
    <button type='button' onClick={onClick} className='appbar-button' disabled={disabled} style={disabled ? { pointerEvents: "none" } : {}}>
      {/* <Tappable onTap={onClick}> */}
      {children}
      {/* </Tappable> */}
    </button>
  </Tooltip>
)

export default AppbarButton
