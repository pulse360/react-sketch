import React from 'react'
import { FillColorIcon, StrokeColorIcon, BackgroundImage } from '../SVG'
import AppbarButton from '../AppbarButton'
import './styles.css'
import FillColor from '../FillColor'

const ColorTools = ({ setAnchorEl, open }) => {
  const handleClick = (event, key) => {
    setAnchorEl(event)
    open(key)
  }

  return (
    <div className='color-tools'>
      <AppbarButton onClick={(event) => handleClick(event, 'expandFillColor')}>
        <FillColorIcon />
      </AppbarButton>
      <FillColor />
      <AppbarButton onClick={(event) => handleClick(event, 'expandStrokeColor')}>
        <StrokeColorIcon />
      </AppbarButton>
      <AppbarButton onClick={setAnchorEl}>
        <BackgroundImage />
      </AppbarButton>
    </div>
  )
}

export default ColorTools
