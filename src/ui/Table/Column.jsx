import React from 'react';
import PropTypes from 'prop-types';

export default function Column(props) {
  const { className } = props;
  return <col className={className} />;
}

Column.propTypes = {
  className: PropTypes.string,
};
