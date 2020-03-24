import React from 'react'
import DropZone from 'react-dropzone'
import './styles.css'
import IconButton from '../LeftPanelButton'

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

const ToolsPanel = ({ selectTool, addImage, addText, selectedTool }) => {
  return (
    <div className='left-toolbar'>
      <IconButton onClick={() => selectTool('select')} selectedTool={selectedTool} tool='select'>
        <SelectIcon />
      </IconButton>
      <IconButton onClick={() => selectTool('pencil')} selectedTool={selectedTool} tool='pencil'>
        <PencilIcon />
      </IconButton>
      <IconButton onClick={() => selectTool('arrow')} selectedTool={selectedTool} tool='arrow'>
        <ArrowIcon />
      </IconButton>
      <IconButton onClick={() => selectTool('line')} selectedTool={selectedTool} tool='line'>
        <LineIcon />
      </IconButton>
      <IconButton onClick={() => selectTool('highlighter')} selectedTool={selectedTool} tool='highlighter'>
        <HighlighterIcon />
      </IconButton>
      <IconButton onClick={() => selectTool('rectangle')} selectedTool={selectedTool} tool='rectangle'>
        <RectangleIcon />
      </IconButton>
      <IconButton onClick={() => selectTool('circle')} selectedTool={selectedTool} tool='circle'>
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
      <IconButton onClick={() => selectTool('eraser')} selectedTool={selectedTool} tool='eraser'>
        <EraserIcon />
      </IconButton>
    </div>
  )
}

export default ToolsPanel
