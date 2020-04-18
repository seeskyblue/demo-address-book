import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  CheckBox,
  CheckBoxOutlineBlank,
  IndeterminateCheckBox,
} from '@styled-icons/material';

const Label = styled.label`
  cursor: pointer;
`;

const CheckedIcon = styled(CheckBox)`
  color: #1890ff;
`;

const UnCheckedIcon = styled(CheckBoxOutlineBlank)`
  color: #e0e0e0;
`;

const IndeterminateIcon = styled(IndeterminateCheckBox)`
  color: #e0e0e0;
`;

export default function Checkbox(props) {
  const {
    checked = false,
    children,
    indeterminate,
    value,
    size,
    onChange,
  } = props;

  const CheckIcon = getCheckIcon(checked, indeterminate);
  const handleChange = (event) => {
    onChange?.(value, event?.target.checked, event);
  };

  return (
    <Label>
      <CheckIcon size={size} />
      <input type="checkbox" checked={checked} onChange={handleChange} hidden />
      {children}
    </Label>
  );
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.node,
  indeterminate: PropTypes.bool,
  size: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
};

function getCheckIcon(checked, indeterminate) {
  if (indeterminate) return IndeterminateIcon;
  if (checked) return CheckedIcon;
  return UnCheckedIcon;
}
