import React from 'react'
import './styles.css'

const colors = [
  "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3",
  "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", 
  "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"
 ]
 
const ColorSelector = ({ selected, onChangeColor }) => {
  return <div className="color-selector">
    { 
      colors.map(hex=>
          <button className={selected===hex?' active':''} 
            key={hex}
            onClick={()=>onChangeColor({hex})}
            onTouchStart={()=>onChangeColor({hex})}
            style={{backgroundColor: selected===hex? 'white':hex, borderColor:hex }} >
          </button>
      ) 
    }
  </div>
}

export default ColorSelector
