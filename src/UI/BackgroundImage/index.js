import React from 'react'
import { Popover } from '@material-ui/core'
import './styles.css'
import { BackgroundImageIcon } from '../SVG'
import {useDropzone} from 'react-dropzone';

import lines from './images/lines.png'
import white from './images/white.png'
import yellow from './images/yellow.png'
import blue from './images/blue.png'
import cell from './images/cell.png'
// import paper from './images/paper.png'
// for some weird reason, if this is not commented, the build includes it into the dist build

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

const devImages = [
  { image: lines },
  // { image: paper },
  { image: cell },
  { image: white },
  { image: yellow },
  { image: blue },
]

const BackgroundImage = ({ open, handleOpen, anchorEl, changeImage, images = devImages, addBackgroundImage }) => {
  const { getRootProps, getInputProps } = useDropzone({ accept: 'image/*' })
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
        <label htmlFor='strokeColor' className='background-image__label'>
          Background Image
        </label>
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
        <div
          accept='image/*'
          multiple={false}
          className='background-image__template'
          onDrop={(img) => addBackgroundImage(img)}
          {...getRootProps({ className: 'bg-dropzone' })}
        >
          <input style={{ display: 'hidden' }} {...getInputProps()} />+
        </div>
      </>
    </Popover>
  )
}

export default BackgroundImage
