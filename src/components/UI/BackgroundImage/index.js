import React from 'react'
import { Popover } from '@material-ui/core'
import './styles.css'
import { BackgroundImageIcon } from '../SVG'
import DropZone from 'react-dropzone'

import paper from './images/paper.png'
import lines from './images/lines.png'
import white from './images/white.png'
import yellow from './images/yellow.png'
import blue from './images/blue.png'
import cell from './images/cell.png'

const style = {
  padding: 20,
  display: 'flex',
  flexWrap: 'wrap',
  maxWidth: 250,
  minHeight: 200,
  alignItems: 'center',
  justifyContent: 'space-between',

  borderTopRightRadius: 0,
  overflowY: 'visible',
  overflowX: 'visible',
}

const devImages = [{ image: lines }, { image: cell }, { image: white }, { image: yellow }, { image: blue }]

const BackgroundImage = ({ open, handleOpen, anchorEl, changeImage, images = devImages, addBackgroundImage }) => {
  const handleClick = (image) => {
    changeImage(image)
    handleOpen()
  }

  return (
    <Popover
      PaperProps={{ style }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      BackdropProps={{
        backgroundColor: 'black',
      }}
      id='back-image'
      open={open}
      anchorEl={anchorEl}
      onClose={handleOpen}
      transition='true'
    >
      <>
        <div className='background-image-indicator-wrapper'>
          <BackgroundImageIcon />
        </div>
        {images.map((item, index) => {
          return (
            <button
              key={index}
              onClick={() => handleClick(item.image)}
              style={{ backgroundImage: `url(${item.image})` }}
              className='background-image__button'
            ></button>
          )
        })}
        <DropZone
          accept='image/*'
          multiple={false}
          className='background-image__template'
          onDrop={(img) => addBackgroundImage(img)}
        >
          +
        </DropZone>
      </>
    </Popover>
  )
}

export default BackgroundImage
