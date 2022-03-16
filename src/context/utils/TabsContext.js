import { createContext, useContext, useState } from 'react'

const TabsContext = createContext()
TabsContext.displayName = 'TabsContext'

export default function TabsContextProvider({ children, ...props }) {
  const [selectedTabId, setSelectedTabId] = useState(0)
  const [selectedOrdersTabId, setSelectedOrdersTabId] = useState(0)

  return (
    <TabsContext.Provider
      value={{
        selectedTabId,
        setSelectedTabId,
        selectedOrdersTabId,
        setSelectedOrdersTabId,
      }}
      {...props}
    >
      {children}
    </TabsContext.Provider>
  )
}

export const useTabs = () => {
  const context = useContext(TabsContext)
  if (!context)
    throw new Error("useTabs doit s'utiliser avec TabsContext.Provider")
  return context
}
