"use client";

import React from "react";

import { metamaskState, metamaskAction } from "@/services/metamaskProvider";
import { metamaskReducer, initialState } from "@/services/metamaskProvider";

const metamaskContext = React.createContext<metamaskState | null>(null);

const metamaskTaskContext =
  React.createContext<React.Dispatch<metamaskAction> | null>(null);

export function MetamaskProvider({ children }: any) {
  const [state, dispatch] = React.useReducer(metamaskReducer, initialState);

  return (
    <metamaskContext.Provider value={state}>
      <metamaskTaskContext.Provider value={dispatch}>
        {children}
      </metamaskTaskContext.Provider>
    </metamaskContext.Provider>
  );
}

export function useMetamaskContext() {
  return React.useContext(metamaskContext);
}

export function useMetamaskTaskContext() {
  return React.useContext(metamaskTaskContext);
}