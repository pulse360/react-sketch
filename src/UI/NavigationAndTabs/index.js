import React, { Component } from 'react'
import './styles.css'
import { AddTabIcon, ArrowUpIcon, ArrowDownIcon, ArrowLeftIcon } from '../SVG'
import StyledButton from '../StyledButton'

const tabStyle = {
  selected_note: { color: '#fff', backgroundColor: '#20A0FF' },
  selected_whiteboard: { color: '#fff', backgroundColor: '#53BC31' },
  not_selected_note: { color: '#20A0FF', backgroundColor: '#323e4c' },
  not_selected_whiteboard: { color: '#53BC31', backgroundColor: '#323e4c' },
}

function Tab({ tab, currentTabID, selectTab }) {
  return (
    <StyledButton
      style={tabStyle[`${currentTabID === tab.id?"selected":"not_selected"}_${tab.type}`]}
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
          <Tab tab={tabs[currentTabID]} currentTabID={currentTabID} selectTab={this.toggleExpandedTabs} />
          {showTabs &&
            filteredTabs.map((tab) => <Tab key={tab.id} tab={tab} currentTabID={currentTabID} selectTab={this.selectTab} />)}
          <StyledButton
            style={{ width:25, color: '#20A0FF', transform: showTabs?'rotate(180deg)':'' }}
            tooltipPlacement='top'
            navigationBar={true}
            title='Toggle expanded page list'
            onClick={this.toggleExpandedTabs}
          >
            <ArrowLeftIcon />
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
