import React, { useState, useEffect } from 'react'
import './styles.css'
import { AddTabIcon, ArrowUpIcon, ArrowDownIcon } from '../SVG'
import StyledButton from '../StyledButton'

const tabStyle = {
  true: { color: '#fff', backgroundColor: '#20A0FF' },
  false: { color: '#20A0FF', backgroundColor: '#323e4c' },
}

function Tab({ tab, currentTabID, selectTab }) {
  return (
    <StyledButton
      style={tabStyle[currentTabID === tab.id]}
      tooltipPlacement='top'
      navigationBar={true}
      title={tab.name}
      onClick={() => selectTab(tab)}
    >
      {tab.name}
    </StyledButton>
  )
}

function Tabs({ tabs, onTabClick, currentTabID }) {
  const [showTabs, setShowTabs] = useState(false)
  const [filteredTabs, setFilteredTabs] = useState(tabs)
  const [selectedTab, setSelectedTab] = useState(tabs[0])
  const [timer, setTimer] = useState(false)

  useEffect(() => {
    setSelectedTab(tabs.find((tab) => tab.id === currentTabID) || tabs[0])
    setFilteredTabs(tabs.filter((tab) => tab.id !== currentTabID))
  }, [tabs, currentTabID])

  const toggleExpandedTabs = () => {
    if (timer) {
      clearTimeout(timer)
      setTimer(false)
    }
    if (!showTabs) {
      setTimer(setTimeout(() => setShowTabs(false), 2000))
    }
    setShowTabs(!showTabs)
  }

  const selectTab = (tab) => {
    onTabClick(tab)
    toggleExpandedTabs()
  }

  if (tabs.length > 1) {
    return (
      <div className='tabs'>
        <Tab tab={selectedTab} currentTabID={currentTabID} selectTab={selectTab} />
        {showTabs &&
          filteredTabs.map((tab) => <Tab key={tab.id} tab={tab} currentTabID={currentTabID} selectTab={selectTab} />)}
        <StyledButton
          style={{ width: 25, color: '#20A0FF' }}
          tooltipPlacement='top'
          navigationBar={true}
          title='Toggle expanded page list'
          onClick={toggleExpandedTabs}
        >
          &#9668;
        </StyledButton>
      </div>
    )
  }
  return false
}

export default function toolbar({ scrollUp, scrollDown, onAddTab, tabs = [], onTabClick, currentTabID }) {
  return (
    <>
      <div className='sketch-toolbar right'>
        <StyledButton tooltipPlacement='left' onClick={scrollUp} navigationBar={true} title='Scroll Up'>
          <ArrowUpIcon />
        </StyledButton>
        <StyledButton tooltipPlacement='left' onClick={scrollDown} navigationBar={true} title='Scroll Down'>
          <ArrowDownIcon />
        </StyledButton>
        <StyledButton
          tooltipPlacement='left'
          onClick={onAddTab}
          navigationBar={true}
          title={tabs.length < 2 ? 'Add Tab' : ''}
        >
          <AddTabIcon />
        </StyledButton>
      </div>
      <Tabs tabs={tabs} onTabClick={onTabClick} currentTabID={currentTabID} />
    </>
  )
}
