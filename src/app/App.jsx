import React from 'react';

import AddressBook from './AddressBook';

import { IntlProvider } from 'context/i18n';

export default function App() {
  return (
    <IntlProvider>
      <AddressBook />
    </IntlProvider>
  );
}
