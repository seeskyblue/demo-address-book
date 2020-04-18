import React from 'react';
import PropTypes from 'prop-types';
import { ArrowDropDown, ArrowDropUp } from '@styled-icons/material';
import styled from 'styled-components';

export const ORDER_NONE = 0;
export const ORDER_ASC = -1;
export const ORDER_DESC = 1;
const ORDER_LOOP = [ORDER_NONE, ORDER_ASC, ORDER_DESC];

const iconSize = 20;

const SortUp = styled(ArrowDropUp).attrs({
  size: iconSize,
})`
  display: block;
  margin-bottom: -14px;
`;

const SortDown = styled(ArrowDropDown).attrs({
  size: iconSize,
})`
  display: block;
  margin-top: -14px;
`;

const Button = styled.button.attrs({
  type: 'button',
})`
  border: none;
  background: none;
  outline: none;
  color: rgba(0, 0, 0, 0.45);

  padding: 0;
  vertical-align: middle;

  cursor: pointer;

  ${SortUp} {
    color: ${(props) => (props.$order === ORDER_ASC ? '#1890ff' : 'unset')};
  }

  ${SortDown} {
    color: ${(props) => (props.$order === ORDER_DESC ? '#1890ff' : 'unset')};
  }
`;

export default function TableHeaderSorter(props) {
  const { className, order = ORDER_NONE, onChange } = props;

  const handleSorterChange = () => {
    onChange?.(ORDER_LOOP[(ORDER_LOOP.indexOf(order) + 1) % ORDER_LOOP.length]);
  };

  return (
    <Button className={className} $order={order} onClick={handleSorterChange}>
      <SortUp />
      <SortDown />
    </Button>
  );
}

TableHeaderSorter.propTypes = {
  className: PropTypes.string,
  order: PropTypes.oneOf(ORDER_LOOP),
  onChange: PropTypes.func,
};
