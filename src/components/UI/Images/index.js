import React from 'react'
import DropZone from 'react-dropzone'
import Drawer from '@material-ui/core/Drawer'

const styles = {
  dropArea: {
    width: '100%',
    height: '64px',
    border: '2px dashed rgb(102, 102, 102)',
    borderStyle: 'dashed',
    borderRadius: '5px',
    textAlign: 'center',
    paddingTop: '20px',
    cursor: 'pointer',
  },
  activeStyle: {
    borderStyle: 'solid',
    backgroundColor: '#eee',
  },
  rejectStyle: {
    borderStyle: 'solid',
    backgroundColor: '#ffdddd',
  },
  card: {
    margin: '10px 10px 5px 0',
  },
}

const Images = ({ open, handleOpen, addImage }) => (
  <Drawer anchor='right' open={open} onClose={handleOpen}>
    <br />
    <DropZone
      accept='image/*'
      multiple={false}
      style={styles.dropArea}
      activeStyle={styles.activeStyle}
      rejectStyle={styles.rejectStyle}
      onDrop={(file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          const b64 = reader.result
          addImage(b64)
        }
        reader.readAsDataURL(file[0])
      }}
    >
      Try dropping an image here,
      <br />
      or click
      <br />
      to upload an image.
    </DropZone>
  </Drawer>
)

export default Images
