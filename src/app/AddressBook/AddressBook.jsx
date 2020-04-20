import React from 'react';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';

import mockDataSource from './mock';

import Table from 'ui/Table';
import useEventCallback from 'util/useEventCallback';
import { setObjectValue } from 'util/object';

const DATA_EDIT_KEY = '__editing';
const DATA_ADD_KEY = '__added';
const INIT_DATA = {
  name: '',
  location: '',
  office: '',
  'phone.office': '',
  'phone.cell': '',
};

const MESSAGE_BASE = 'address_book';
const MESSAGE_TABLE_TITLE = `${MESSAGE_BASE}.table.caption`;
const MESSAGE_COLUMN_TITLE_ID = `${MESSAGE_BASE}.table.column.id`;
const MESSAGE_COLUMN_TITLE_NAME = `${MESSAGE_BASE}.table.column.name`;
const MESSAGE_COLUMN_TITLE_LOCATION = `${MESSAGE_BASE}.table.column.location`;
const MESSAGE_COLUMN_TITLE_OFFICE = `${MESSAGE_BASE}.table.column.office`;
const MESSAGE_COLUMN_TITLE_PHONE = `${MESSAGE_BASE}.table.column.phone`;
const MESSAGE_COLUMN_TITLE_CELL = `${MESSAGE_BASE}.table.column.cell`;

const MESSAGE_ACTION_ADD = `${MESSAGE_BASE}.action.add`;
const MESSAGE_ACTION_DELETE = `${MESSAGE_BASE}.action.delete`;
const MESSAGE_ACTION_UPDATE = `${MESSAGE_BASE}.action.update`;

const Page = styled.main`
  max-width: 1024px;
  margin: 0 auto;
`;

const AddressTable = styled(Table)`
  width: 100%;
  margin: 40px auto 0;
`;

const AddressAction = styled.div`
  display: flex;
  margin: 40px auto 0;
`;

const Button = styled.button.attrs({
  type: 'button',
})`
  width: 150px;
  height: 36px;

  background: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;

  font-size: 14px;

  cursor: pointer;

  & + & {
    margin-left: 20px;
  }

  && {
    margin-left: ${(props) => (props.$pushRight ? 'auto' : 0)};
  }

  &:hover {
    color: #1890ff;
    border-color: currentColor;
  }
`;

const Input = styled.input`
  display: block;

  box-sizing: border-box;
  height: 36px;
`;

const Text = styled.span`
  cursor: ${(props) => (props.$editable ? 'pointer' : 'default')};
`;

function getDataKey(data) {
  return data[DATA_ADD_KEY] ?? data.id;
}

export default function AddressBook() {
  const { formatMessage } = useIntl();

  const [selectedKeys, handleSelect] = React.useState();
  const [deletedKeys, handleDelete] = useDelete(selectedKeys);
  const [editMap, handleEdit] = useEdit();
  const columnRender = useColumnRender(handleEdit);
  const [addedKeys, handleAdd] = useAdd(handleEdit);
  const adjustedDataSource = useDataSource(
    mockDataSource,
    addedKeys,
    deletedKeys,
    editMap
  );
  const handleUpdate = useUpdate(adjustedDataSource);

  return (
    <Page>
      <AddressTable
        dataSource={adjustedDataSource}
        dataKey={getDataKey}
        selectable
        onSelect={handleSelect}
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
          render={columnRender}
          sortable
        />
        <Table.Column
          title={formatMessage({ id: MESSAGE_COLUMN_TITLE_LOCATION })}
          dataIndex="location"
          render={columnRender}
          sortable
        />
        <Table.Column
          title={formatMessage({ id: MESSAGE_COLUMN_TITLE_OFFICE })}
          dataIndex="office"
          render={columnRender}
          sortable
        />
        <Table.ColumnGroup
          key="phone"
          title={formatMessage({ id: MESSAGE_COLUMN_TITLE_PHONE })}
        >
          <Table.Column
            title={formatMessage({ id: MESSAGE_COLUMN_TITLE_OFFICE })}
            dataIndex={['phone', 'office']}
            render={columnRender}
            sortable
          />
          <Table.Column
            title={formatMessage({ id: MESSAGE_COLUMN_TITLE_CELL })}
            dataIndex={['phone', 'cell']}
            render={columnRender}
            editable
            sortable
          />
        </Table.ColumnGroup>
      </AddressTable>
      <AddressAction>
        <Button onClick={handleDelete}>
          <FormattedMessage id={MESSAGE_ACTION_DELETE} />
        </Button>
        <Button onClick={handleUpdate} $pushRight>
          <FormattedMessage id={MESSAGE_ACTION_UPDATE} />
        </Button>
        <Button onClick={handleAdd}>
          <FormattedMessage id={MESSAGE_ACTION_ADD} />
        </Button>
      </AddressAction>
    </Page>
  );
}

AddressBook.propTypes = {};

function useDelete(selectedKeys) {
  const [deletedKeys, setDeletedKeys] = React.useState([]);

  return [
    deletedKeys,
    React.useCallback(() => {
      setDeletedKeys((prevState) => prevState.concat(selectedKeys));
    }, [selectedKeys]),
  ];
}

function useEdit() {
  const [editMap, setEditMap] = React.useState({});

  return [
    editMap,
    React.useCallback((dataKey, columnValueMap) => {
      setEditMap((prevState) =>
        columnValueMap != null &&
        Object.keys(columnValueMap).some(
          (columnKey) =>
            prevState[dataKey]?.[columnKey] !== columnValueMap[columnKey]
        )
          ? {
              ...prevState,
              [dataKey]: {
                ...prevState[dataKey],
                ...columnValueMap,
              },
            }
          : prevState
      );
    }, []),
  ];
}

function useAdd(onEdit) {
  const [addedKeys, setAddedKeys] = React.useState([]);
  const addedKeyRef = React.useRef(0);

  const handleEdit = useEventCallback(onEdit);

  React.useEffect(() => {
    const addedKeyCount = addedKeys.length;
    if (addedKeyCount === 0) return;

    const lastAddedKey = addedKeys[addedKeyCount - 1];
    handleEdit(lastAddedKey, INIT_DATA);
  }, [addedKeys, handleEdit]);

  return [
    addedKeys,
    React.useCallback(() => {
      setAddedKeys((prevState) =>
        prevState.concat([`__${addedKeyRef.current++}`])
      );
    }, []),
  ];
}

function useUpdate(adjustedDataSource) {
  const [updateData, setUpdateData] = React.useState();

  React.useEffect(() => {
    if (!updateData) return;
    alert(JSON.stringify(updateData, null, '  '));
    console.debug(updateData);
  }, [updateData]);

  const updateDataSource = React.useMemo(
    () =>
      adjustedDataSource.reduce(
        (result, data) => {
          const editingData = data[DATA_EDIT_KEY];
          if (editingData == null) return result;

          if (data[DATA_ADD_KEY] != null) {
            result.added.push(editingData);
          } else {
            result.edited.push({ id: data.id, ...editingData });
          }

          return result;
        },
        { added: [], edited: [] }
      ),
    [adjustedDataSource]
  );

  return React.useCallback(() => {
    setUpdateData(updateDataSource);
  }, [updateDataSource]);
}

/**
 * adjust original data source by:
 *   1. add new rows,
 *   2. remove deleted rows,
 *   3. change edited value.
 */
function useDataSource(dataSource, addedKeys, deletedKeys, editMap) {
  return React.useMemo(
    () =>
      dataSource
        .concat(addedKeys.map((key) => ({ [DATA_ADD_KEY]: key })))
        .filter((data) => !deletedKeys?.includes(getDataKey(data)))
        .map((data) => {
          const mergedData = { ...data };
          const editingData = editMap[getDataKey(data)];

          if (editingData) {
            setObjectValue(mergedData, DATA_EDIT_KEY, editingData);
            Object.keys(editingData).forEach((key) => {
              setObjectValue(mergedData, key, editingData[key]);
            });
          }

          return mergedData;
        }),
    [addedKeys, dataSource, deletedKeys, editMap]
  );
}

function useColumnRender(onEdit) {
  const handleEdit = useEventCallback(onEdit);

  return React.useCallback(
    (value, data, column) => {
      const dataKey = getDataKey(data);
      const columnKey = column.key;
      const editingValue = data[DATA_EDIT_KEY]?.[columnKey];

      return editingValue != null ? (
        <Input
          defaultValue={editingValue}
          onBlur={(event) => {
            handleEdit(dataKey, { [columnKey]: event.target.value });
          }}
        />
      ) : (
        <Text
          $editable={column.editable}
          onDoubleClick={
            column.editable
              ? () => {
                  handleEdit(dataKey, { [columnKey]: value });
                }
              : null
          }
        >
          {value}
        </Text>
      );
    },
    [handleEdit]
  );
}
