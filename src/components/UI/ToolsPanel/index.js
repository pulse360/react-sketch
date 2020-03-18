import React from 'react'

import { PencilIcon, ArrowIcon, LineIcon, HighlighterIcon, RectangleIcon, CircleleIcon, PastImageIcon } from '../SVG'
import IconButton from '../LeftPanelButton'

const ToolsPanel = ({ selectTool }) => (
  <div className='left-toolbar'>
    <IconButton onClick={() => selectTool('pencil')}>
      <PencilIcon />
    </IconButton>
    <IconButton onClick={() => selectTool('arrow')}>
      <ArrowIcon />
    </IconButton>
    <IconButton onClick={() => selectTool('line')}>
      <LineIcon />
    </IconButton>
    <IconButton onClick={() => selectTool('highlighter')}>
      <HighlighterIcon />
    </IconButton>
    <IconButton onClick={() => selectTool('rectangle')}>
      <RectangleIcon />
    </IconButton>
    <IconButton onClick={() => selectTool('circle')}>
      <CircleleIcon />
    </IconButton>
    <IconButton>
      <PastImageIcon />
    </IconButton>
  </div>
)

export default ToolsPanel
