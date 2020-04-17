import React from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    color: rgba(0, 0, 0, 0.65);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
  }
`;

export default function ThemeProvider(props) {
  const { children } = props;

  return (
    <>
      <GlobalStyle />
      {children}
    </>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
