"use client";

/*
 *  NOTE:
 *    The following file defines the context for the
 *    metamask state and actions.
 */

// Imports React libraries (in particular the context API).
import React from "react";
// Imports the metamask state and actions from the metamaskProvider file.
import { metamaskState, metamaskAction } from "@/services/metamaskReducer";
// Imports the metamask reducer and initial state from the metamaskReducer file.
import { metamaskReducer, initialState } from "@/services/metamaskReducer";

// Creates the metamask context, which is used to store the metamask state.
const metamaskStateContext = React.createContext<metamaskState | null>(null);
// Creates the metamask task context, which is used to store the metamask actions.
const metamaskTaskContext =
  React.createContext<React.Dispatch<metamaskAction> | null>(null);

/**
 * The MetamaskProvider function is used to provide the metamask context to the
 * application.
 *
 * @param param The children to be wrapped by the MetamaskProvider component.
 * @returns The wrapped children of the MetamaskProvider component,
 * which have access to the metamask context.
 *
 */
export function MetamaskProvider({ children }: any) {
  // Creates the metamask state and actions using the metamask reducer
  // and initial state.
  const [state, dispatch] = React.useReducer(metamaskReducer, initialState);

  return (
    <metamaskStateContext.Provider value={state}>
      <metamaskTaskContext.Provider value={dispatch}>
        {children}
      </metamaskTaskContext.Provider>
    </metamaskStateContext.Provider>
  );
}

/**
 *  The useMetamaskStateContext function is used to access
 *  the metamask state.
 *
 * @returns The metamask state context.
 *
 */
export function usemetamaskStateContext() {
  return React.useContext(metamaskStateContext);
}

/**
 *  The useMetamaskTaskContext function is used to access
 *  the metamask actions.
 *
 * @returns The metamask task context.
 *
 */
export function useMetamaskTaskContext() {
  return React.useContext(metamaskTaskContext);
}
