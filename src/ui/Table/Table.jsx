import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Table = styled.table``;

export default Table;

Table.Row = styled.tr``;

Table.Cell = styled.td.attrs((props) => ({
  as: props.head ? 'th' : 'td',
}))``;
