import React from 'react'
import { SketchBoard } from '../src/index'

import {data} from './dumyData' // dummy data usage

// const data = {
//   id: null,
//   json: null,
// }

class SketchFieldDemo extends React.Component {
  componentDidMount = () => {
    (function (console) {
      console.save = function (data, filename) {
        if (!data) {
          console.error('Console.save: No data')
          return
        }
        if (!filename) filename = 'console.json'
        if (typeof data === 'object') {
          data = JSON.stringify(data, undefined, 4)
        }
        const blob = new Blob([data], { type: 'text/json' }),
          e = document.createEvent('MouseEvents'),
          a = document.createElement('a')
        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
      }
    })(console)
  }
  
  render() {
    return <SketchBoard defaultValue={{...data}} onSaveCanvas={(data)=>console.save(data,'dummy.json')}  />
  }
}

export default SketchFieldDemo
