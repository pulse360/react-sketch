import { Tooltip } from '@material-ui/core'
import React, { createRef } from 'react'
import Dropzone from 'react-dropzone'
import Tappable from 'react-tappable'
import StyledButton from '../StyledButton'
import {
  AddTextIcon,
  ArrowIcon,
  CircleleIcon,
  EraserIcon,
  HighlighterIcon,
  LineIcon,
  PastImageIcon,
  PencilIcon,
  RectangleIcon,
  SelectIcon,
} from '../SVG'
import './styles.css'

const ToolsPanel = ({ selectTool, addImage, selectedTool }) => {
  const dropzoneRef = createRef()

  return (
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
      <Tappable
        onTap={(event) => {
          event.preventDefault()
          if (dropzoneRef.current) {
            dropzoneRef.current.open()
          }
        }}
      >
        <Tooltip title='Add Image' placement='right'>
          <Dropzone
            noClick
            noKeyboard
            ref={dropzoneRef}
            accept='image/*'
            multiple={false}
            className='drop-area-images'
            onDrop={(file) => {
              const reader = new FileReader()
              reader.onloadend = () => {
                addImage(reader.result)
                selectTool('select')
              }
              reader.readAsDataURL(file[0])
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <StyledButton {...getRootProps({ className: 'tooltip-dropzone' })} tool='file'>
                <input style={{ display: 'hidden' }} {...getInputProps()} />
                <PastImageIcon />
              </StyledButton>
            )}
          </Dropzone>
        </Tooltip>
      </Tappable>
      <StyledButton
        onClick={() => selectTool('eraser')}
        selectedTool={selectedTool}
        tool='eraser'
        title='Element Eraser'
      >
        <EraserIcon />
      </StyledButton>
    </div>
  )
}

export default ToolsPanel
