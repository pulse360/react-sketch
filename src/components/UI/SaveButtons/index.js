import React from 'react'
import { SaveIcon, CleareIcon } from '../SVG'
import AppbarButton from '../AppbarButton'
import './styles.css'

const SaveTools = ({ save, clear }) => (
  <div className='save-tools'>
    <AppbarButton onClick={save}>
      <SaveIcon />
    </AppbarButton>
    <AppbarButton onClick={clear}>
      <CleareIcon />
    </AppbarButton>
  </div>
)

export default SaveTools
