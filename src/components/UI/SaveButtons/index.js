import React, { Component } from 'react'
import { SaveIcon, CleareIcon } from '../SVG'
import AppbarButton from '../AppbarButton'
import ConfirmClear from './ConfirmClear'
import './styles.css'

class SaveButtons extends Component {
  state = {
    open: false,
  }

  render() {
    const { save, clear } = this.props

    return (
      <div className='save-tools'>
        <AppbarButton onClick={save}>
          <SaveIcon />
        </AppbarButton>
        <ConfirmClear open={this.state.open} clear={clear} onClose={() => this.setState({ open: false })} />
        <AppbarButton onClick={() => this.setState({ open: true })}>
          <CleareIcon />
        </AppbarButton>
      </div>
    )
  }
}

export default SaveButtons
