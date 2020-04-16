import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

import Table from 'ui/Table';

const MESSAGE_BASE = 'address_book.table';
const MESSAGE_TITLE_ID = `${MESSAGE_BASE}.header.id`;
const MESSAGE_TITLE_NAME = `${MESSAGE_BASE}.header.name`;
const MESSAGE_TITLE_LOCATION = `${MESSAGE_BASE}.header.location`;
const MESSAGE_TITLE_OFFICE = `${MESSAGE_BASE}.header.office`;
const MESSAGE_TITLE_PHONE = `${MESSAGE_BASE}.header.phone`;
const MESSAGE_TITLE_CELL = `${MESSAGE_BASE}.header.cell`;

export default function AddressBookTable(props) {
  const { data } = props;
  const { formatMessage } = useIntl();

  return (
    <Table data={data}>
      <Table.Column
        title={formatMessage({ id: MESSAGE_TITLE_ID })}
        dataIndex="id"
      />
      <Table.Column
        title={formatMessage({ id: MESSAGE_TITLE_NAME })}
        dataIndex="name"
      />
      <Table.Column
        title={formatMessage({ id: MESSAGE_TITLE_LOCATION })}
        dataIndex="location"
      />
      <Table.Column
        title={formatMessage({ id: MESSAGE_TITLE_OFFICE })}
        dataIndex="office"
      />
      <Table.ColumnGroup
        key="phone"
        title={formatMessage({ id: MESSAGE_TITLE_PHONE })}
      >
        <Table.Column
          title={formatMessage({ id: MESSAGE_TITLE_OFFICE })}
          dataIndex={['phone', 'office']}
        />
        <Table.Column
          title={formatMessage({ id: MESSAGE_TITLE_CELL })}
          dataIndex={['phone', 'cell']}
        />
      </Table.ColumnGroup>
    </Table>
  );
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
