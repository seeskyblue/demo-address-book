import React from 'react';

const ColumnContext = React.createContext();

export default ColumnContext;

export function useColumnContext() {
  return React.useContext(ColumnContext);
}
