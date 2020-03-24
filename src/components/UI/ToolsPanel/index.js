import React from 'react'
import DropZone from 'react-dropzone'
import './styles.css'

import {
  PencilIcon,
  ArrowIcon,
  LineIcon,
  HighlighterIcon,
  RectangleIcon,
  CircleleIcon,
  PastImageIcon,
  EraserIcon,
  SelectIcon,
  AddTextIcon,
} from '../SVG'
import IconButton from '../LeftPanelButton'

const ToolsPanel = ({ selectTool, addImage, addText }) => {
  return (
    <div className='left-toolbar'>
      <IconButton onClick={() => selectTool('select')}>
        <SelectIcon />
      </IconButton>
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
      <IconButton onClick={addText}>
        <AddTextIcon />
      </IconButton>
      <DropZone
        accept='image/*'
        multiple={false}
        className='drop-area-images'
        onDrop={(file) => {
          const reader = new FileReader()
          reader.onloadend = () => {
            const b64 = reader.result
            addImage(b64)
          }
          reader.readAsDataURL(file[0])
        }}
      >
        <PastImageIcon />
      </DropZone>
      <IconButton onClick={() => selectTool('eraser')}>
        <EraserIcon />
      </IconButton>
    </div>
  )
}

export default ToolsPanel
