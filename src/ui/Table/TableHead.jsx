import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getFlattenColumns, omitDefaultSpan } from './util';
import Sorter, { ORDER_LOOP } from './Sorter';

import Checkbox from 'ui/Checkbox';

const ColumnSorter = styled(Sorter)`
  margin-left: 3px;
`;

export default function TableHead(props) {
  const { columns, selectable, selectedAll, onSelectAll, sort, onSort } = props;

  const heads = useHeads(columns);
  const headCount = heads.length;

  const handleSelectAll = (_, checked) => {
    onSelectAll?.(checked);
  };

  const makeSortHandle = (key) => (order) => {
    onSort?.(key, order);
  };

  return (
    <thead>
      {heads.map((headColumns, rowIndex) => (
        <tr key={rowIndex}>
          {selectable && rowIndex === 0 && (
            <th rowSpan={omitDefaultSpan(headCount)}>
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
                column.children ? 1 : headCount - rowIndex
              )}
              colSpan={omitDefaultSpan(column.colSpan)}
              scope={column.children ? 'colgroup' : 'col'}
            >
              {column.title}
              {column.sortable && (
                <ColumnSorter
                  order={sort?.key === column.key ? sort.order : undefined}
                  onChange={makeSortHandle(column.key)}
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
  sort: PropTypes.shape({
    key: PropTypes.string,
    order: PropTypes.oneOf(ORDER_LOOP),
  }),
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
