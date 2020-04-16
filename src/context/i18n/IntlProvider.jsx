import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider as Provider } from 'react-intl';

import IntlContext from './IntlContext';
import { flattenMessage } from './util';

const DEFAULT_LOCALE = 'en';

export default function IntlProvider(props) {
  const { children = null } = props;

  const [locale, setLocale] = React.useState(DEFAULT_LOCALE);
  const messages = useLocaleMessages(locale);
  const contextValue = React.useMemo(
    () => ({
      setLocale,
    }),
    []
  );

  return (
    <IntlContext.Provider value={contextValue}>
      {messages && (
        <Provider locale={locale} messages={messages}>
          {children}
        </Provider>
      )}
    </IntlContext.Provider>
  );
}

IntlProvider.propTypes = {
  children: PropTypes.node,
};

function useLocaleMessages(locale) {
  const [messages, setMessages] = React.useState();

  React.useEffect(() => {
    let cancel = false;
    if (locale == null) return;

    import(`./messages/${locale}.js`)
      .then(({ default: message }) => {
        if (!cancel) setMessages(flattenMessage(message));
      })
      .catch(console.error);

    return () => {
      cancel = true;
    };
  }, [locale]);

  return messages;
}
