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
  AddCircleIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '../SVG'
import { Tooltip } from '@material-ui/core'

const ToolsPanel = ({ selectTool, addImage, selectedTool, scrollUp, scrollDown, addPage }) => {
  return (
    <>
    <div className='left-toolbar'>
      <IconButton onClick={() => selectTool('select')} selectedTool={selectedTool} tool='select' title='Select'>
        <SelectIcon />
      </IconButton>
      <IconButton onClick={() => selectTool('pencil')} selectedTool={selectedTool} tool='pencil' title='Pencil'>
        <PencilIcon />
      </IconButton>
      <IconButton onClick={() => selectTool('arrow')} selectedTool={selectedTool} tool='arrow' title='Arrow'>
        <ArrowIcon />
      </IconButton>
      <IconButton onClick={() => selectTool('line')} selectedTool={selectedTool} tool='line' title='Line'>
        <LineIcon />
      </IconButton>
      <IconButton
        onClick={() => selectTool('highlighter')}
        selectedTool={selectedTool}
        tool='highlighter'
        title='Hightlight'
      >
        <HighlighterIcon />
      </IconButton>
      <IconButton
        onClick={() => selectTool('rectangle')}
        selectedTool={selectedTool}
        tool='rectangle'
        title='Rectangle'
      >
        <RectangleIcon />
      </IconButton>
      <IconButton onClick={() => selectTool('circle')} selectedTool={selectedTool} tool='circle' title='Circle'>
        <CircleleIcon />
      </IconButton>
      <IconButton onClick={() => selectTool('text')} selectedTool={selectedTool} tool='text' title='Add Text'>
        <AddTextIcon />
      </IconButton>
      {/* <IconButton onClick={addText}>
        <AddTextIcon />
      </IconButton> */}
      <Tooltip title='Add Image' placement='right'>
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
      <IconButton
        onClick={() => selectTool('eraser')}
        selectedTool={selectedTool}
        tool='eraser'
        title='Element Eraser'
      >
        <EraserIcon />
      </IconButton>
    </div>
    <div className="left-toolbar navigation">
    <IconButton
        onClick={scrollUp}
        title='Scroll Up'
      >
        <ArrowUpIcon />
      </IconButton>
      <IconButton
        onClick={scrollDown}
        title='Scroll Down'
      >
        <ArrowDownIcon />
      </IconButton>
      <IconButton 
        onClick={addPage} 
        title='Add new page'
      >
        <AddCircleIcon />
      </IconButton>
    </div>
    </>
  )
}

export default ToolsPanel
