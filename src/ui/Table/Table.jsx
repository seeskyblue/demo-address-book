import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';

import Column from './Column';
import ColumnGroup from './ColumnGroup';
import TableHead from './TableHead';
import TableBody from './TableBody';
import { getColumnsFromChildren } from './util';

import useEventCallback from 'util/useEventCallback';
import { getObjectValue } from 'util/object';
import { orderBy } from 'util/array';

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
  const {
    className,
    dataSource,
    dataKey,
    children,
    selectable = false,
    onSelect,
    title,
  } = props;

  const columns = useColumns(children);
  const dataKeys = useDataKeys(dataSource, dataKey);

  const [selectedKeys, handleSelect, handleSelectAlll] = useSelectedKeys(
    dataKeys
  );
  useSelectHandle(selectedKeys, onSelect);

  const [sort, handleSort] = useSort();
  const sortedDataSource = useSortedDataSource(dataSource, sort);

  const dataCount = dataSource?.length;
  const selectedCount = selectedKeys?.length ?? 0;

  return (
    <table className={className} css={tableCSS}>
      {title && <caption>{title}</caption>}
      <colgroup>
        {selectable && <col />}
        {children}
      </colgroup>
      <TableHead
        columns={columns}
        selectable={selectable}
        selectedAll={
          selectedCount > 0 && dataCount === selectedCount
            ? true
            : selectedCount === 0
            ? false
            : null
        }
        onSelectAll={handleSelectAlll}
        sort={sort}
        onSort={handleSort}
      />
      <TableBody
        columns={columns}
        dataSource={sortedDataSource}
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
  className: PropTypes.string,
  dataKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.func,
  ]),
  dataSource: PropTypes.arrayOf(PropTypes.object),
  selectable: PropTypes.bool,
  title: PropTypes.string,
  onSelect: PropTypes.func,
};

Table.Column = Column;
Table.ColumnGroup = ColumnGroup;
Table.Head = TableHead;
Table.Body = TableBody;

/**
 * Convert children to column by children's props
 */
function useColumns(children) {
  const [columns, setColumns] = React.useState();

  React.useEffect(() => {
    setColumns(getColumnsFromChildren(children));
  }, [children]);

  return columns;
}

/**
 * Get keys from dataSource
 */
function useDataKeys(dataSource, dataKey) {
  return React.useMemo(
    () => dataSource.map((data) => getObjectValue(data, dataKey)),
    [dataKey, dataSource]
  );
}

/**
 * Handle selected keys change, remove keys not in data keys
 */
function useSelectedKeys(dataKeys) {
  const [keys, setKeys] = React.useState();

  React.useEffect(() => {
    setKeys((prevState) =>
      prevState?.some((key) => !dataKeys.includes(key))
        ? prevState.filter((key) => dataKeys.includes(key))
        : prevState
    );
  }, [dataKeys]);

  return [
    keys,
    React.useCallback((key, selected) => {
      if (key == null) return;
      setKeys((prevState = []) =>
        !selected
          ? prevState?.filter((selectedKey) => selectedKey !== key)
          : !prevState.includes(key)
          ? prevState.concat(key)
          : prevState
      );
    }, []),
    React.useCallback(
      (selectedAll) => {
        setKeys(selectedAll ? dataKeys : []);
      },
      [dataKeys]
    ),
  ];
}

/**
 * Handle callback when selected keys changed
 */
function useSelectHandle(selectedKeys, callback) {
  const handleCallback = useEventCallback(callback);

  React.useEffect(() => {
    if (selectedKeys != null) handleCallback(selectedKeys);
  }, [handleCallback, selectedKeys]);
}

function useSort() {
  const [sort, setSort] = React.useState();

  return [
    sort,
    React.useCallback((key, order) => {
      setSort(order && { key, order });
    }, []),
  ];
}

/**
 * Sort data source
 */
function useSortedDataSource(dataSource, sort) {
  return React.useMemo(() => {
    if (sort == null) return dataSource;

    const { key, order } = sort;
    return [...dataSource].sort(orderBy(key, order));
  }, [dataSource, sort]);
}
