import React from 'react';

import { IntlProvider } from 'context/i18n';

export default function App() {
  return (
    <IntlProvider>
      <div>123</div>
    </IntlProvider>
  );
}
