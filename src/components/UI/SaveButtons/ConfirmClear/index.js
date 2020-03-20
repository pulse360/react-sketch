import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Slide from '@material-ui/core/Slide'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function AlertDialogSlide({ clear, open, onClose }) {
  const onConfirmClick = () => {
    onClose()
    clear()
  }

  const onUnConfirmClick = () => {
    onClose()
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            Are you sure that you want to delete this scratch note?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onUnConfirmClick} color='primary'>
            Disagree
          </Button>
          <Button onClick={onConfirmClick} color='primary'>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
