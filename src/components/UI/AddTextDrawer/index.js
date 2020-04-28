import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Drawer from '@material-ui/core/Drawer'

const styles = {
  drawer: {
    padding: 30,
    width: '50%',
  },
  field: {
    width: '100%',
  },
  button: {
    width: '100%',
    height: 50,
    marginTop: 10,
    cursor: 'pointer',
  },
}

const AddTextDrawer = ({ open, handleOpen, changeText, text, addText }) => (
  <Drawer anchor='right' open={open} onClose={handleOpen} PaperProps={{ style: styles.drawer }}>
    <div className='row'>
      <TextField style={styles.field} variant='outlined' multiline onChange={changeText} value={text} />
      <Button variant='contained' color='primary' style={styles.button} onClick={addText} disabled={!text}>
        Add text
      </Button>
    </div>
  </Drawer>
)

export default AddTextDrawer
