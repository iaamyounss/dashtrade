import { Children, cloneElement, useState } from 'react'
import { useTabs } from 'context/TabsContext'
import TextField from '@mui/material/TextField'
import DateRangePicker from '@mui/lab/DateRangePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import styled from '@mui/material/styles/styled'
import './PeriodSelect.css'

function TabList({ children, ...props }) {
  const clones = Children.map(children, (child, tabId) =>
    cloneElement(child, {
      tabId,
      ...props,
    })
  )
  return (
    <div className='tab' {...props}>
      {clones}
    </div>
  )
}

function Tab({ tabId, children }) {
  const { selectedOrdersTabId, setSelectedOrdersTabId } = useTabs()

  return (
    <button
      key={children}
      className={selectedOrdersTabId === tabId ? 'tablinks active' : 'tablinks'}
      onClick={() => setSelectedOrdersTabId(tabId)}
    >
      {children}
    </button>
  )
}

function TabPanels({ children }) {
  return Children.map(children, (child, panelId) =>
    cloneElement(child, {
      panelId,
    })
  )
}

function Panel({ panelId, children, ...props }) {
  const { selectedOrdersTabId } = useTabs()

  return selectedOrdersTabId === panelId ? (
    <div {...props}>{children}</div>
  ) : null
}

export default function PeriodSelect() {
  return (
    <div className='periodSelect'>
      <TabList>
        <Tab>1 Day</Tab>
        <Tab>1 Week</Tab>
        <Tab>1 Month</Tab>
        <Tab>3 Months</Tab>
      </TabList>
      <div className='dateSelect'>
        <Typography>date</Typography>
        <SelectByDate />
      </div>
      <TabPanels>
        <Panel></Panel>
        <Panel></Panel>
        <Panel></Panel>
        <Panel></Panel>
      </TabPanels>
    </div>
  )
}

const SearchButton = styled(Button)({
  padding: '5px 16px',
})

function SelectByDate() {
  const [value, setValue] = useState([null, null])

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText='YYYY-MM-DD'
        endText='YYYY-MM-DD'
        value={value}
        onChange={newValue => {
          setValue(newValue)
        }}
        renderInput={(startProps, endProps) => (
          <>
            <TextField className='dateSelect' {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField className='dateSelect' {...endProps} />
            <i className='fa-solid fa-calendar'></i>
            <SearchButton className='searchButton' variant='contained'>
              Search
            </SearchButton>
          </>
        )}
      />
    </LocalizationProvider>
  )
}
