import { Children, cloneElement } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import PositionsTable from './tables/PositionsTable'
import OpenOrders from './tables/OpenOrders'
import OrderHistory from './tables/OrderHistory'
import { useTabs } from 'context/TabsContext'
import PeriodSelect from './tables/PeriodSelect'
import './OrdersPanel.css'

function TabList({ children, ...props }) {//FIXME rendre toute cette partie en composant panel générique
  const clones = Children.map(children, (child, tabId) =>
    cloneElement(child, {
      tabId,
      ...props,
    })
  )
  return (
    <div className='tab' {...props}>
      <div>{clones}</div>
      <div className='hide-other-symbols'>
        <FormControlLabel
          control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 22 } }} />}
          label='Hide Other Symbols'
        />
        <div className='sliders-icon'>
          <i className='fa-solid fa-sliders'></i>
        </div>
      </div>
    </div>
  )
}

function Tab({ tabId, children }) {
  const { selectedTabId, setSelectedTabId } = useTabs()

  return (
    <button
      key={children}
      className={selectedTabId === tabId ? 'tablinks active' : 'tablinks'}
      onClick={() => setSelectedTabId(tabId)}
    >
      {children}
    </button>
  )
}

function TabPanels({ children }) {
  return Children.map(children, (child, panelId) =>
    cloneElement(child, {
      className: 'tabcontent',
      panelId,
    })
  )
}

function Panel({ panelId, children, ...props }) {
  const { selectedTabId } = useTabs()

  return selectedTabId === panelId ? <div {...props}>{children} </div> : null
}

export default function OrdersPanel() {
  const { selectedTabId } = useTabs()

  return (
    <div className='tabs'>
      <TabList>
        <Tab>Positions(1)</Tab>
        <Tab>Open Orders(0)</Tab>
        <Tab>Order History</Tab>
        <Tab>Trade History</Tab>
        <Tab>Transaction History</Tab>
        <Tab>Assets</Tab>
        <Tab>API Key</Tab>
      </TabList>
      {selectedTabId === 2 && <PeriodSelect />}
      <TabPanels className='orders-panels'>
        <Panel>
          <PositionsTable />
        </Panel>
        <Panel>
          <OpenOrders />
        </Panel>
        <Panel>
          <OrderHistory />
        </Panel>
        <Panel></Panel>
        <Panel></Panel>
        <Panel></Panel>
        <Panel></Panel>
      </TabPanels>
    </div>
  )
}
