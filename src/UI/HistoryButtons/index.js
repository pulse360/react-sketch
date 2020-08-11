import React, { Component } from 'react'
import { UndoIcon, CleareIcon, RedoIcon } from '../SVG'
import AppbarButton from '../AppbarButton'
import ConfirmClear from './ConfirmClear'
import './styles.css'

class HistoryTools extends Component {
  state = {
    open: false,
  }

  render() {
    const { undo, redo, canUndo, canRedo, clear } = this.props
    return <div className='history-tools'>
    <AppbarButton title='Clear Sketchpad' onClick={() => this.setState({ open: true })}>
      <CleareIcon />
    </AppbarButton>
    <ConfirmClear open={this.state.open} clear={clear} onClose={() => this.setState({ open: false })} />

    <AppbarButton title="Undo Last Action" onClick={undo} disabled={!canUndo}>
      <UndoIcon />
    </AppbarButton>
    <AppbarButton title="Redo Last Action" onClick={redo} disabled={!canRedo}>
      <RedoIcon />
    </AppbarButton>
  </div>
}}

export default HistoryTools
