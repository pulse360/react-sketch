import React, { Component } from 'react'
import { SaveIcon, CleareIcon, PrintIcon } from '../SVG'
import AppbarButton from '../AppbarButton'
import ConfirmClear from './ConfirmClear'
import './styles.css'

class SaveButtons extends Component {
  state = {
    open: false,
  }

  render() {
    const { save, clear, print } = this.props

    return (
      <div className='save-tools'>
        <AppbarButton title='Save Changes' onClick={save}>
          <SaveIcon />
        </AppbarButton>
        <ConfirmClear open={this.state.open} clear={clear} onClose={() => this.setState({ open: false })} />
        <AppbarButton title='Save as PDF' onClick={print}>
          <PrintIcon />
        </AppbarButton>
        <AppbarButton title='Clear Sketchpad' onClick={() => this.setState({ open: true })}>
          <CleareIcon />
        </AppbarButton>
      </div>
    )
  }
}

export default SaveButtons
