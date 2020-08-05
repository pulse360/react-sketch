import React from 'react'
import './styles.css'
import Slider from '@material-ui/lab/Slider'
import { Tooltip } from '@material-ui/core'

class SliderComponent extends React.Component {
  handleChange = (event) => {
    this.props.onChange(Number(event.currentTarget.value))
  }

  componentDidMount() {
    // if (!!navigator.platform.match(/iPhone|iPod|iPad/)) {
    //   diagramSlider.addEventListener("touchend", this.handleChange, {passive: true})
    // }
  }

  render() {
    return (
      <Tooltip title={'Stroke width: ' + this.props.value} arrow>
        <div className='slider-wrapper'>
          <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M11 1L10 0L0 10L1 11L11 1Z' fill='black' />
            <path d='M15 5L13 3L3 13L5 15L15 5Z' fill='black' />
            <path d='M10 20L7 17L17 7L20 10L10 20Z' fill='black' />
          </svg>
          <div className='input-wrapper'>
            {/* <svg
            className='track-line'
            width='198'
            height='5'
            viewBox='0 0 198 5'
            fill='transparent'
            xmlns='http://www.w3.org/2000/svg'
            version='1.1'
          >
            <path d='M2.5 2.5L198 0L198 5Z' fill='black' />
          </svg> */}
            <Slider
              step={1}
              min={1}
              max={50}
              aria-labelledby='slider'
              value={this.props.value}
              onChange={(e, v) => this.props.onChange(v)}
            />
          </div>
        </div>
      </Tooltip>
    )
  }
}

export default SliderComponent
