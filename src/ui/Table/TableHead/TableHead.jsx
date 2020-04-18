import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getFlattenColumns, omitDefaultSpan } from '../util';

import Sorter, { ORDER_NONE } from './Sorter';

import Checkbox from 'ui/Checkbox';
import useEventCallback from 'util/useEventCallback';

const ColumnSorter = styled(Sorter)`
  margin-left: 3px;
`;

export default function TableHead(props) {
  const { columns, selectable, selectedAll, onSelectAll, onSort } = props;

  const heads = useHeads(columns);
  const headRows = heads.length;

  const [sorter, handleSorterChange] = useSort(onSort);
  const [sortKey, sortOrder] = sorter ?? [];

  const handleSelectAll = (_, checked) => {
    onSelectAll?.(checked);
  };

  return (
    <thead>
      {heads.map((headColumns, rowIndex) => (
        <tr key={rowIndex}>
          {selectable && rowIndex === 0 && (
            <th rowSpan={omitDefaultSpan(headRows)}>
              <Checkbox
                size={18}
                checked={selectedAll ?? false}
                indeterminate={selectedAll == null}
                onChange={handleSelectAll}
              />
            </th>
          )}
          {headColumns?.map((column) => (
            <th
              key={column.key}
              rowSpan={omitDefaultSpan(
                column.children ? 1 : headRows - rowIndex
              )}
              colSpan={omitDefaultSpan(column.colSpan)}
              scope={column.children ? 'colgroup' : 'col'}
            >
              {column.title}
              {column.sortable && (
                <ColumnSorter
                  order={sortKey === column.key ? sortOrder : undefined}
                  onChange={(order) => {
                    handleSorterChange(
                      order !== ORDER_NONE ? [column.key, order] : undefined
                    );
                  }}
                />
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}

TableHead.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      children: PropTypes.arrayOf(PropTypes.object),
      dataIndex: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
      ]),
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
  selectable: PropTypes.bool,
  selectedAll: PropTypes.bool,
  onSelectAll: PropTypes.func,
  onSort: PropTypes.func,
};

function useHeads(columns) {
  return React.useMemo(() => {
    const heads = [];
    let children = columns;

    while (children?.length > 0) {
      heads.push(
        children.map((child) => ({
          ...child,
          colSpan: getFlattenColumns(child.children)?.length,
        }))
      );

      children = children.reduce((list, column) => {
        if (column.children != null) list.push(...column.children);
        return list;
      }, []);
    }

    return heads;
  }, [columns]);
}

function useSort(callback) {
  const [sorter, setSorter] = React.useState();
  const handleSort = useEventCallback(callback);

  React.useEffect(() => {
    if (sorter != null) handleSort(...sorter);
  }, [handleSort, sorter]);

  return [sorter, setSorter];
}
