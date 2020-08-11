import React from 'react'
import { SaveIcon, PrintIcon, NotifyIcon, ExitIcon } from '../SVG'
import AppbarButton from '../AppbarButton'
import './styles.css'

export default function SaveButtons({save, exit, print, notify}) {
  return <div className='save-tools'>
    <AppbarButton title='Discard changes and Exit' onClick={exit} style={{ color: 'rgb(246, 79, 100)', transform: 'rotate(180deg)' }}>
      <ExitIcon />
    </AppbarButton>
    <AppbarButton title='Download as PDF' onClick={print}>
      <PrintIcon />
    </AppbarButton>
    <AppbarButton title='Save Changes' onClick={save} >
      <SaveIcon />
    </AppbarButton>
    <AppbarButton title='Alert Team Members' onClick={notify} style={{ color: '#20A0FF' }}>
      <NotifyIcon />
    </AppbarButton>
  </div>
}