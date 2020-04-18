import React from 'react';
import PropTypes from 'prop-types';
import { ArrowDropDown, ArrowDropUp } from '@styled-icons/material';
import styled from 'styled-components';

export const STATUS_NONE = 0;
export const STATUS_UP = -1;
export const STATUS_DOWN = 1;
const STATUS_ORDER = [STATUS_NONE, STATUS_UP, STATUS_DOWN];

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
    color: ${(props) => (props.$status === STATUS_UP ? '#1890ff' : 'unset')};
  }

  ${SortDown} {
    color: ${(props) => (props.$status === STATUS_DOWN ? '#1890ff' : 'unset')};
  }
`;

export default function TableHeaderSorter(props) {
  const { className, status = STATUS_NONE, onChange } = props;

  const handleStatusChange = () => {
    const nextStatusIndex =
      (STATUS_ORDER.indexOf(status) + 1) % STATUS_ORDER.length;
    onChange?.(STATUS_ORDER[nextStatusIndex]);
  };

  return (
    <Button className={className} $status={status} onClick={handleStatusChange}>
      <SortUp />
      <SortDown />
    </Button>
  );
}

TableHeaderSorter.propTypes = {
  className: PropTypes.string,
  status: PropTypes.oneOf(STATUS_ORDER),
  onChange: PropTypes.func,
};
