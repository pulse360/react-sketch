import React from 'react'
import './styles.css'
import { AddTabIcon } from '../SVG'

const Tabs = ({ tabs, onTabClick, onAddTab, currentTabID }) => {
  return (
    <div className='tabs__row'>
      {tabs.map((tab, index) => {
        let activeClass = currentTabID === tab.id ? 'tabs__tab_active' : ''
        return (
          <div className={`tabs__tab ${activeClass}`} onClick={() => onTabClick(tab)} key={index}>
            {tab.name}
          </div>
        )
      })}
      <button type='button' onClick={onAddTab} className='tabs__button'>
        <AddTabIcon />
      </button>
    </div>
  )
}

export default Tabs
