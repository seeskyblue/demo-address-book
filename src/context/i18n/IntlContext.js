import React from 'react';

const IntlContext = React.createContext();

export default IntlContext;

export function useIntlContext() {
  return React.useContext(IntlContext);
}
