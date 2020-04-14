import React from 'react'
import './styles.css'

const Slider = ({ onChange, value }) => {
  const handleChange = (event) => {
    onChange(Number(event.currentTarget.value))
  }

  return (
    <div className='slider-wrapper'>
      <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M11 1L10 0L0 10L1 11L11 1Z' fill='black' />
        <path d='M15 5L13 3L3 13L5 15L15 5Z' fill='black' />
        <path d='M10 20L7 17L17 7L20 10L10 20Z' fill='black' />
      </svg>
      <div className='input-wrapper'>
        <svg
          className='track-line'
          width='198'
          height='5'
          viewBox='0 0 198 5'
          fill='transparent'
          xmlns='http://www.w3.org/2000/svg'
          version='1.1'
        >
          <path d='M2.5 2.5L198 0L198 5Z' fill='black' />
        </svg>
        <input className='slider' type='range' min='1' max='50' value={value} onChange={handleChange}></input>
      </div>
    </div>
  )
}

export default Slider
