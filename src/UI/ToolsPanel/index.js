import React from 'react'
import DropZone from 'react-dropzone'
import './styles.css'
import StyledButton from '../StyledButton'

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
      <div className='sketch-toolbar left'>
        <StyledButton onClick={() => selectTool('select')} selectedTool={selectedTool} tool='select' title='Select'>
          <SelectIcon />
        </StyledButton>
        <StyledButton onClick={() => selectTool('pencil')} selectedTool={selectedTool} tool='pencil' title='Pencil'>
          <PencilIcon />
        </StyledButton>
        <StyledButton onClick={() => selectTool('arrow')} selectedTool={selectedTool} tool='arrow' title='Arrow'>
          <ArrowIcon />
        </StyledButton>
        <StyledButton onClick={() => selectTool('line')} selectedTool={selectedTool} tool='line' title='Line'>
          <LineIcon />
        </StyledButton>
        <StyledButton
          onClick={() => selectTool('highlighter')}
          selectedTool={selectedTool}
          tool='highlighter'
          title='Hightlight'
        >
          <HighlighterIcon />
        </StyledButton>
        <StyledButton
          onClick={() => selectTool('rectangle')}
          selectedTool={selectedTool}
          tool='rectangle'
          title='Rectangle'
        >
          <RectangleIcon />
        </StyledButton>
        <StyledButton onClick={() => selectTool('circle')} selectedTool={selectedTool} tool='circle' title='Circle'>
          <CircleleIcon />
        </StyledButton>
        <StyledButton onClick={() => selectTool('text')} selectedTool={selectedTool} tool='text' title='Add Text'>
          <AddTextIcon />
        </StyledButton>
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
        <StyledButton
          onClick={() => selectTool('eraser')}
          selectedTool={selectedTool}
          tool='eraser'
          title='Element Eraser'
        >
          <EraserIcon />
        </StyledButton>
      </div>
      <div className="sketch-toolbar right">
        <StyledButton
          tooltipPlacement="left"
          onClick={scrollUp}
          navigationBar={true}
          title='Scroll Up'
        >
          <ArrowUpIcon />
        </StyledButton>
        <StyledButton
          tooltipPlacement="left"
          onClick={scrollDown}
          navigationBar={true}
          title='Scroll Down'
        >
          <ArrowDownIcon />
        </StyledButton>
        <StyledButton 
          tooltipPlacement="left"
          onClick={addPage}
          navigationBar={true}
          title='Add new page'
        >
          <AddCircleIcon />
        </StyledButton>
      </div>
    </>
  )
}

export default ToolsPanel
