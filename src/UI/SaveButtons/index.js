import React from 'react'
import { SaveIcon, PrintIcon, NotifyIcon, ExitIcon } from '../SVG'
import StyledButton from '../StyledButton'
import './styles.css'

export default function SaveButtons({save, exit, print, notify}) {
  return <div className='save-tools'>
    <StyledButton title='Exit' onClick={exit} style={{ transform: 'rotate(180deg)', width:'70px' }}>
      <ExitIcon />
    </StyledButton>
    <StyledButton title='Download as PDF' onClick={print}>
      <PrintIcon />
    </StyledButton>
    <StyledButton title='Save Changes' onClick={save} >
      <SaveIcon />
    </StyledButton>
    <StyledButton title='Alert Team Members' onClick={notify} >
      <NotifyIcon />
    </StyledButton>
  </div>
}