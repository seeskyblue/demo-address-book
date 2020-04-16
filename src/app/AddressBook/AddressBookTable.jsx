import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Table = styled.table``;

export default function AddressBookTable(props) {
  const { data } = props;

  return <Table />;
}

AddressBookTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      location: PropTypes.string,
      name: PropTypes.string,
      office: PropTypes.string,
      phone: PropTypes.shape({
        cell: PropTypes.string,
        office: PropTypes.string,
      }),
    })
  ),
};
