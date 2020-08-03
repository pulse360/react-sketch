import React from 'react'
import { UndoIcon, RedoIcon } from '../SVG'
import AppbarButton from '../AppbarButton'
import './styles.css'

const HistoryTools = ({ undo, redo, canUndo, canRedo }) => (
  <div className='history-tools'>
    <AppbarButton title="Undo Last Action" onClick={undo} disabled={!canUndo}>
      <UndoIcon />
    </AppbarButton>
    <AppbarButton title="Redo Last Action" onClick={redo} disabled={!canRedo}>
      <RedoIcon />
    </AppbarButton>
  </div>
)

export default HistoryTools
