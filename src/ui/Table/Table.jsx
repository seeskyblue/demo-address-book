import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';

import Column from './Column';
import ColumnGroup from './ColumnGroup';
import TableHead from './TableHead';
import TableBody from './TableBody';
import { getColumnsFromChildren, getObjectValue } from './util';

const tableCSS = css`
  border-collapse: collapse;

  & caption {
    font-size: 18px;
    font-weight: bold;
  }

  &,
  & th,
  & td {
    border: 1px solid #e0e0e0;
  }

  & caption,
  & th,
  & td {
    padding: 16px;
  }

  & th {
    background: #fafafa;
  }
`;

export default function Table(props) {
  const { dataSource, dataKey, children, selectable = false, title } = props;

  const columns = useColumns(children);
  const [selectedKeys, handleSelect, handleSelectAlll] = useSelectedKeys(
    dataSource,
    dataKey
  );

  const dataCount = dataSource?.length;
  const selectedCount = selectedKeys?.length;

  return (
    <table css={tableCSS}>
      {title && <caption>{title}</caption>}
      <colgroup>
        {selectable && <col />}
        {children}
      </colgroup>
      <TableHead
        columns={columns}
        selectable={selectable}
        selectedAll={
          dataCount === selectedCount
            ? true
            : selectedCount === 0
            ? false
            : null
        }
        onSelectAll={handleSelectAlll}
      />
      <TableBody
        columns={columns}
        dataSource={dataSource}
        dataKey={dataKey}
        selectable={selectable}
        selectedKeys={selectedKeys}
        onSelect={handleSelect}
      />
    </table>
  );
}

Table.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  dataKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.func,
  ]),
  dataSource: PropTypes.arrayOf(PropTypes.object),
  selectable: PropTypes.bool,
  title: PropTypes.string,
};

Table.Column = Column;
Table.ColumnGroup = ColumnGroup;
Table.Head = TableHead;
Table.Body = TableBody;

function useDataSource(defaultDataSource, dataKey, changedDataSource) {
  const defaultDataMap = React.useMemo(
    () =>
      defaultDataSource.reduce((map, data) => {
        map[getObjectValue(data, dataKey)] = data;
        return map;
      }, {}),
    [dataKey, defaultDataSource]
  );

  const changedDataMap = React.useMemo(
    () =>
      changedDataSource.reduce((map, data) => {
        map[getObjectValue(data, dataKey)] = data;
        return map;
      }, {}),
    [dataKey, changedDataSource]
  );

  return React.useMemo(() => {});
}

function useColumns(children) {
  const [columns, setColumns] = React.useState();

  React.useEffect(() => {
    setColumns(getColumnsFromChildren(children));
  }, [children]);

  return columns;
}

function useSelectedKeys(dataSource, dataKey) {
  const [keys, setKeys] = React.useState([]);
  console.debug(keys);

  return [
    keys,
    React.useCallback((key, selected) => {
      if (key == null) return;

      setKeys((prevState) =>
        !selected
          ? prevState?.filter((selectedKey) => selectedKey !== key)
          : !prevState.includes(key)
          ? prevState.concat(key)
          : prevState
      );
    }, []),
    React.useCallback(
      (selectedAll) => {
        console.debug(dataSource.map((data) => getObjectValue(data, dataKey)));
        setKeys(
          selectedAll
            ? dataSource.map((data) => getObjectValue(data, dataKey))
            : []
        );
      },
      [dataKey, dataSource]
    ),
  ];
}
