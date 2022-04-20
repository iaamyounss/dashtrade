import { createContext, useContext, useState } from "react";

const ExchangeContext = createContext();

export function useExchange() {
  const context = useContext(ExchangeContext);
  if (!context)
    throw new Error(
      "useExchange doit s'utiliser avec ExchangeContext.Provider"
    );
  return context;
}

export default function ExchangeContextProvider({ children, ...props }) {
  const [exchange, setExchange] = useState({});

  return (
    <ExchangeContext.Provider value={{ exchange, setExchange }}>
      {children}
    </ExchangeContext.Provider>
  );
}
