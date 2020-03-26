import React from 'react'
import { Popover } from '@material-ui/core'
import './styles.css'

import paper from './images/paper.png'

const style = {
  padding: 20,
}

const devImages = [{ image: paper }]

const BackgroundImage = ({ open, handleOpen, anchorEl, changeImage, images = devImages }) => {
  const handleClick = (image) => {
    changeImage(image)
    handleOpen()
  }

  return (
    <Popover
      PaperProps={{ style }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      id='fill-color'
      open={open}
      anchorEl={anchorEl}
      onClose={handleOpen}
      transition='true'
    >
      {images.map((item) => {
        return (
          <button
            onClick={() => handleClick(item.image)}
            style={{ backgroundImage: `url(${item.image})` }}
            className='background-image__button'
          >
          </button>
        )
      })}
    </Popover>
  )
}

export default BackgroundImage
