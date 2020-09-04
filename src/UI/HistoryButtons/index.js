import React, { Component } from 'react'
import Icon from 'react-icons-kit'
import { ic_delete_forever } from 'react-icons-kit/md/ic_delete_forever'
import StyledButton from '../StyledButton'
import { RedoIcon, UndoIcon } from '../SVG'
import ConfirmClear from './ConfirmClear'
import './styles.css'

class HistoryTools extends Component {
  state = {
    open: false,
  }

  render() {
    const { undo, redo, canUndo, canRedo, clear } = this.props
    return (
      <div className='history-tools'>
        <StyledButton
          title='Clear this page'
          onClick={() => this.setState({ open: true })}
          style={{ color: '#324057' }}
        >
          <Icon icon={ic_delete_forever} size={20} />
        </StyledButton>
        <ConfirmClear open={this.state.open} clear={clear} onClose={() => this.setState({ open: false })} />

        <StyledButton title='Undo Last Action' onClick={undo} disabled={!canUndo}>
          <UndoIcon />
        </StyledButton>
        <StyledButton title='Redo Last Action' onClick={redo} disabled={!canRedo}>
          <RedoIcon />
        </StyledButton>
      </div>
    )
  }
}

export default HistoryTools
