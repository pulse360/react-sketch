import React from 'react'
import Icon from 'react-icons-kit'
import { save as saveIcon } from 'react-icons-kit/fa/save'
import { ic_picture_as_pdf } from 'react-icons-kit/md/ic_picture_as_pdf'
import StyledButton from '../StyledButton'
import { ExitIcon, NotifyIcon } from '../SVG'
import './styles.css'

export default function SaveButtons({ save, exit, print, notify }) {
  return (
    <div className='save-tools'>
      <StyledButton title='Exit' onClick={exit} style={{ transform: 'rotate(180deg)' }}>
        <ExitIcon />
      </StyledButton>
      <StyledButton title='Download as PDF' onClick={print}>
        <Icon icon={ic_picture_as_pdf} size={20} />
      </StyledButton>
      <StyledButton title='Save Changes' onClick={save} style={{ color: '#53BC31' }}>
        <Icon icon={saveIcon} size={20} />
      </StyledButton>
      <StyledButton title='Alert Team Members' onClick={notify}>
        <NotifyIcon />
      </StyledButton>
    </div>
  )
}
