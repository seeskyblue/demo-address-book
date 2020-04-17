import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import Table from 'ui/Table';

const MESSAGE_BASE = 'address_book.table';
const MESSAGE_TABLE_TITLE = `${MESSAGE_BASE}.caption`;
const MESSAGE_COLUMN_TITLE_ID = `${MESSAGE_BASE}.column.id`;
const MESSAGE_COLUMN_TITLE_NAME = `${MESSAGE_BASE}.column.name`;
const MESSAGE_COLUMN_TITLE_LOCATION = `${MESSAGE_BASE}.column.location`;
const MESSAGE_COLUMN_TITLE_OFFICE = `${MESSAGE_BASE}.column.office`;
const MESSAGE_COLUMN_TITLE_PHONE = `${MESSAGE_BASE}.column.phone`;
const MESSAGE_COLUMN_TITLE_CELL = `${MESSAGE_BASE}.column.cell`;

export default function AddressBookTable(props) {
  const { dataSource } = props;
  const { formatMessage } = useIntl();

  return (
    <Table
      dataSource={dataSource}
      selectable
      title={formatMessage({ id: MESSAGE_TABLE_TITLE })}
    >
      <Table.Column
        title={formatMessage({ id: MESSAGE_COLUMN_TITLE_ID })}
        dataIndex="id"
        sortable
      />
      <Table.Column
        title={formatMessage({ id: MESSAGE_COLUMN_TITLE_NAME })}
        dataIndex="name"
        sortable
      />
      <Table.Column
        title={formatMessage({ id: MESSAGE_COLUMN_TITLE_LOCATION })}
        dataIndex="location"
        sortable
      />
      <Table.Column
        title={formatMessage({ id: MESSAGE_COLUMN_TITLE_OFFICE })}
        dataIndex="office"
        sortable
      />
      <Table.ColumnGroup
        key="phone"
        title={formatMessage({ id: MESSAGE_COLUMN_TITLE_PHONE })}
      >
        <Table.Column
          title={formatMessage({ id: MESSAGE_COLUMN_TITLE_OFFICE })}
          dataIndex={['phone', 'office']}
          sortable
        />
        <Table.Column
          title={formatMessage({ id: MESSAGE_COLUMN_TITLE_CELL })}
          dataIndex={['phone', 'cell']}
          sortable
        />
      </Table.ColumnGroup>
    </Table>
  );
}

AddressBookTable.propTypes = {
  dataSource: PropTypes.arrayOf(
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
