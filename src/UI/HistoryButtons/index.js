import React, { Component } from 'react'
import { UndoIcon, CleareIcon, RedoIcon } from '../SVG'
import StyledButton from '../StyledButton'
import ConfirmClear from './ConfirmClear'
import './styles.css'

class HistoryTools extends Component {
  state = {
    open: false,
  }

  render() {
    const { undo, redo, canUndo, canRedo, clear } = this.props
    return <div className='history-tools'>
    <StyledButton title='Clear Sketchpad' onClick={() => this.setState({ open: true })}>
      <CleareIcon />
    </StyledButton>
    <ConfirmClear open={this.state.open} clear={clear} onClose={() => this.setState({ open: false })} />

    <StyledButton title="Undo Last Action" onClick={undo} disabled={!canUndo}>
      <UndoIcon />
    </StyledButton>
    <StyledButton title="Redo Last Action" onClick={redo} disabled={!canRedo}>
      <RedoIcon />
    </StyledButton>
  </div>
}}

export default HistoryTools
