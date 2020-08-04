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
import { Tooltip } from '@material-ui/core'

const ToolsPanel = ({ selectTool, addImage, selectedTool }) => {
  return (
    <div className='left-toolbar'>
      <IconButton onClick={() => selectTool('select')} onclick selectedTool={selectedTool} tool='select' title="Select">
        <SelectIcon />
      </IconButton>
      <IconButton onClick={() => selectTool('pencil')} onclick selectedTool={selectedTool} tool='pencil' title="Pencil">
        <PencilIcon />
      </IconButton>
      <IconButton onClick={() => selectTool('arrow')} onclick selectedTool={selectedTool} tool='arrow' title="Arrow">
        <ArrowIcon />
      </IconButton>
      <IconButton onClick={() => selectTool('line')} onclick selectedTool={selectedTool} tool='line' title="Line">
        <LineIcon />
      </IconButton>
      <IconButton onClick={() => selectTool('highlighter')} onclick selectedTool={selectedTool} tool='highlighter' title="Hightlight">
        <HighlighterIcon />
      </IconButton>
      <IconButton onClick={() => selectTool('rectangle')} onclick selectedTool={selectedTool} tool='rectangle' title="Rectangle">
        <RectangleIcon />
      </IconButton>
      <IconButton onClick={() => selectTool('circle')} onclick selectedTool={selectedTool} tool='circle' title="Circle">
        <CircleleIcon />
      </IconButton>
      <IconButton onClick={() => selectTool('text')} onclick selectedTool={selectedTool} tool='text' title="Add Text">
        <AddTextIcon />
      </IconButton>
      {/* <IconButton onClick={addText}>
        <AddTextIcon />
      </IconButton> */}
              <Tooltip title="Add Image" placement="right">
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
      </Tooltip>
      <IconButton onClick={() => selectTool('eraser')} onclick selectedTool={selectedTool} tool='eraser' title="Element Eraser">
        <EraserIcon />
      </IconButton>
    </div>
  )
}

export default ToolsPanel
