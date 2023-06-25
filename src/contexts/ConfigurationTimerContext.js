import * as React from 'react';
import { initialState, reducer } from '../reducers/setsReducer';

const ConfigurationTimerContext = React.createContext();

// eslint-disable-next-line react/prop-types
export function ConfigurationTimerProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = React.useMemo(() => ({ state, dispatch }), [state]);
  return (
    <ConfigurationTimerContext.Provider value={value}>
      {children}
    </ConfigurationTimerContext.Provider>
  );
}

export default ConfigurationTimerContext;
