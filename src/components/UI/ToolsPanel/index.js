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
      <IconButton onClick={() => selectTool('select')} onclick selectedTool={selectedTool} tool='select'>
        <SelectIcon />
      </IconButton>
      <IconButton onClick={() => selectTool('pencil')} onclick selectedTool={selectedTool} tool='pencil'>
        <PencilIcon />
      </IconButton>
      <IconButton onClick={() => selectTool('arrow')} onclick selectedTool={selectedTool} tool='arrow'>
        <ArrowIcon />
      </IconButton>
      <IconButton onClick={() => selectTool('line')} onclick selectedTool={selectedTool} tool='line'>
        <LineIcon />
      </IconButton>
      <IconButton onClick={() => selectTool('highlighter')} onclick selectedTool={selectedTool} tool='highlighter'>
        <HighlighterIcon />
      </IconButton>
      <IconButton onClick={() => selectTool('rectangle')} onclick selectedTool={selectedTool} tool='rectangle'>
        <RectangleIcon />
      </IconButton>
      <IconButton onClick={() => selectTool('circle')} onclick selectedTool={selectedTool} tool='circle'>
        <CircleleIcon />
      </IconButton>
      <IconButton onClick={() => selectTool('text')} onclick selectedTool={selectedTool} tool='text'>
        <AddTextIcon />
      </IconButton>
      {/* <IconButton onClick={addText}>
        <AddTextIcon />
      </IconButton> */}
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
      <IconButton onClick={() => selectTool('eraser')} onclick selectedTool={selectedTool} tool='eraser'>
        <EraserIcon />
      </IconButton>
    </div>
  )
}

export default ToolsPanel
