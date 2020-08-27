import React, { Component } from 'react'
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


class Tabs extends Component {
  constructor(props){
    super(props)
    this.state = { showTabs: false }
  }
  
  toggleExpandedTabs = () => {
    if (this.state.showTabs) {
      clearTimeout(this.state.showTabs)
      this.setState({showTabs:false})
    } else {
      this.setState({showTabs: setTimeout(() => this.setState({showTabs:false}), 2000)})
    }
  }
  
  selectTab = (tab) => {
    this.props.onTabClick(tab)
    this.toggleExpandedTabs()
  }
  
  render() {
    const { currentTabID,tabs } = this.props
    const { showTabs } = this.state
    const filteredTabs = Object.values(this.props.tabs).filter((tab) => tab.id !== this.props.currentTabID)
    if (filteredTabs.length) {
      return (
        <div className='tabs'>
          <Tab tab={tabs[currentTabID]} currentTabID={currentTabID} selectTab={this.selectTab} />
          {showTabs &&
            filteredTabs.map((tab) => <Tab key={tab.id} tab={tab} currentTabID={currentTabID} selectTab={this.selectTab} />)}
          <StyledButton
            style={{ width: 25, color: '#20A0FF', transform: showTabs?'rotate(180deg)':'' }}
            tooltipPlacement='top'
            navigationBar={true}
            title='Toggle expanded page list'
            onClick={this.toggleExpandedTabs}
          >
            &#9668;
          </StyledButton>
        </div>
      )
    }
    return false
}}

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
