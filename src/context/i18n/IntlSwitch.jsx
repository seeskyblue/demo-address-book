import React from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

import { useIntlContext } from './IntlContext';

const Container = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Button = styled.button`
  background: none;
  border: none;

  color: ${(props) => (props.$current ? '#1890ff' : 'unset')};

  padding: 4px 16px;

  cursor: pointer;
`;

export default function IntlSwitch() {
  const { locale } = useIntl();
  const { setLocale } = useIntlContext();

  const makeLocaleChangeHandle = (changedLocale) => () => {
    setLocale(changedLocale);
  };

  return (
    <Container>
      <Button onClick={makeLocaleChangeHandle('en')} $current={locale === 'en'}>
        English
      </Button>
      |
      <Button onClick={makeLocaleChangeHandle('zh')} $current={locale === 'zh'}>
        简体中文
      </Button>
    </Container>
  );
}

IntlSwitch.propTypes = {};
