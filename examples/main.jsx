import React from 'react'
import { SketchBoard } from '../src/index'

// import {data} from './dumyData' // dummy data usage

const dummyData = {
  id: null,
  json: { objects: [], heightFactor: 5 },
  heightFactor: 5
}

class SketchFieldDemo extends React.Component {
  render() {
    return <SketchBoard defaultValue={dummyData.json} />
  }
}

export default SketchFieldDemo
