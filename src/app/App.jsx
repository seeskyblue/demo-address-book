import React from 'react';

import AddressBook from './AddressBook';

import { IntlProvider } from 'context/i18n';
import { ThemeProvider } from 'context/theme';

export default function App() {
  return (
    <IntlProvider>
      <ThemeProvider>
        <AddressBook />
      </ThemeProvider>
    </IntlProvider>
  );
}
