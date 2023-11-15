"use client";

import React from "react";

export const DataContext = React.createContext();

export const DataProvider = ({ children }) => {
  const [state, setState] = React.useState({
    account: "Lorenzo Test",
    network: "Network Test",
    balance: -999,
    isConnected: true,
  });

  const changeAccount = (account) => {
    setState({ ...state, account: account });
  };

  return (
    <DataContext.Provider value={{ state, changeAccount }}>
      <div> {children}</div>
    </DataContext.Provider>
  );
};
