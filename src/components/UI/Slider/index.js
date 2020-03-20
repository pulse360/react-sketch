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
          height='6'
          viewBox='0 0 200 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M200 1.5C200 0.671573 199.328 0 198.5 0H85V6H198.5C199.328 6 200 5.32843 200 4.5V1.5Z'
            fill='url(#paint0_linear)'
          />
          <rect width='128' height='4' transform='matrix(-1 0 0 1 178 1)' fill='url(#paint1_linear)' />
          <path d='M100 2H1C0.447716 2 0 2.44772 0 3C0 3.55228 0.447716 4 1 4H100V2Z' fill='url(#paint2_linear)' />
          <defs>
            <linearGradient
              id='paint0_linear'
              x1='176.425'
              y1='2.99983'
              x2='99.95'
              y2='2.99976'
              gradientUnits='userSpaceOnUse'
            >
              <stop stop-color='#3A4757' />
              <stop offset='1' stop-color='#3A4757' stop-opacity='0' />
            </linearGradient>
            <linearGradient
              id='paint1_linear'
              x1='78.5'
              y1='2.00007'
              x2='128'
              y2='1.99999'
              gradientUnits='userSpaceOnUse'
            >
              <stop stop-color='#3A4757' />
              <stop offset='1' stop-color='#3A4757' stop-opacity='0' />
            </linearGradient>
            <linearGradient
              id='paint2_linear'
              x1='50'
              y1='3.00002'
              x2='5.58822e-07'
              y2='2.9999'
              gradientUnits='userSpaceOnUse'
            >
              <stop stop-color='#3A4757' />
              <stop offset='1' stop-color='#3A4757' stop-opacity='0' />
            </linearGradient>
          </defs>
        </svg>
        <input className='slider' type='range' min='1' max='50' value={value} onChange={handleChange}></input>
      </div>
    </div>
  )
}

export default Slider
