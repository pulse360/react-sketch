import React from 'react'
import { SketchBoard } from '../src/index'

import {data} from './dumyData' // dummy data usage

const dummyData = {
  id: null,
  json: '',
}

class SketchFieldDemo extends React.Component {
  render() {
    return <SketchBoard defaultValue={{...data}} />
  }
}

export default SketchFieldDemo
