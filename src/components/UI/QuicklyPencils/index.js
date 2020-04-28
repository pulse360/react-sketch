import React from 'react'
import './styles.css'

const quicklyPencils = [
  { id: 'pen_1', defaultColor: '#383838', defaultWidth: 5 },
  { id: 'pen_2', defaultColor: '#004bac', defaultWidth: 5 },
  { id: 'pen_3', defaultColor: '#007224', defaultWidth: 5 },
  { id: 'pen_4', defaultColor: '#c52336', defaultWidth: 5 },
]

const QuicklyPencils = ({ changeActiveQuicklyPenID, selectQuicklyPen, activeQuicklyPenID }) => {
  const handleClick = (id, color, width) => {
    changeActiveQuicklyPenID(id)
    selectQuicklyPen(color, width)
  }

  return (
    <div className='quickly-pens-wrapper'>
      {quicklyPencils.map((pen) => {
        const color = window.localStorage.getItem(`${pen.id}_color`)
        const width = Number(window.localStorage.getItem(`${pen.id}_width`))
        return (
          <QuicklyPen
            key={pen.id}
            onClick={() => handleClick(pen.id, color || pen.defaultColor, width || pen.defaultWidth)}
            color={color || pen.defaultColor}
            lineWidth={width || pen.defaultWidth}
            active={Boolean(activeQuicklyPenID === pen.id)}
          />
        )
      })}
    </div>
  )
}

const QuicklyPen = ({ onClick, color, lineWidth, active }) => {
  let size

  if (lineWidth <= 10) {
    size = 8
  } else if (lineWidth >= 30) {
    size = 30
  } else {
    size = lineWidth
  }

  return (
    <>
      <button type='button' onclick onClick={onClick} className='quickly-pen'>
        <div
          style={{ backgroundColor: color, width: size, height: size }}
          className={`quickly-pen__indicator ${active ? 'quickly-pen__active' : ''}`}
        ></div>
      </button>
    </>
  )
}

export default QuicklyPencils
