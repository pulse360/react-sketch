import React from 'react'
import './styles.css'
import { AddTabIcon, ArrowUpIcon, ArrowDownIcon } from '../SVG'
import StyledButton from '../StyledButton'

export default function toolbar({scrollUp,scrollDown, onAddTab, tabs=[], onTabClick, currentTabID }) {
  console.log(tabs)
  return <>
    <div className="sketch-toolbar right">
      <StyledButton
        tooltipPlacement="left"
        onClick={scrollUp}
        navigationBar={true}
        title='Scroll Up'
      >
        <ArrowUpIcon />
      </StyledButton>
      <StyledButton
        tooltipPlacement="left"
        onClick={scrollDown}
        navigationBar={true}
        title='Scroll Down'
      >
        <ArrowDownIcon />
      </StyledButton>
      <StyledButton
        tooltipPlacement="left"
        onClick={onAddTab}
        navigationBar={true}
        title={tabs.length<2?'Add Tab':''}
      >
        <AddTabIcon />
      </StyledButton>
    </div>
    {tabs.length>1 && <div className='tabs'>
      {tabs.map((tab, index) => {
        let activeClass = currentTabID === tab.id ? 'tabs__tab_active' : ''
        const tabStyle = {
          color: activeClass ? "#fff": "#20A0FF",
          backgroundColor: activeClass ? "#20A0FF": "#323e4c"
        }
        
        return <StyledButton
          style={tabStyle}
          tooltipPlacement="top"
          navigationBar={true}
          title={tab.name}
          onClick={() => onTabClick(tab)} 
          key={index}
        >
          {/* <span className={`tabs__tab ${activeClass}`}> */}
            {tab.name}
            {/* </span> */}
        </StyledButton>
      })}
    </div>
    }
  </>
}
