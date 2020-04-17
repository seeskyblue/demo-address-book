import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TableHeaderSorter from './TableHeadSorter';
import { getColumnKey, getColumnsHeads, omitDefaultSpan } from './util';

import useEventCallback from 'util/useEventCallback';

const Sorter = styled(TableHeaderSorter)`
  margin-left: 3px;
`;

export default function TableHead(props) {
  const { columns, selectable, onSortChange } = props;

  const heads = useHeads(columns);
  const headRows = heads.length;

  const [[sortKey, sortStatus], handleSorterChange] = useSorter(onSortChange);

  return (
    <thead>
      {heads.map((headColumns, rowIndex) => (
        <tr key={rowIndex}>
          {selectable && rowIndex === 0 && (
            <th rowSpan={omitDefaultSpan(headRows)}>
              <input type="checkbox" />
            </th>
          )}
          {headColumns?.map((column) => {
            const columnKey = getColumnKey(column);
            const hasChildren = column.children != null;

            return (
              <th
                key={columnKey}
                rowSpan={omitDefaultSpan(hasChildren ? 1 : headRows - rowIndex)}
                colSpan={omitDefaultSpan(column.colSpan)}
                scope={hasChildren ? 'colgroup' : 'col'}
              >
                {column.title}
                {column.sortable && (
                  <Sorter
                    status={sortKey === columnKey ? sortStatus : undefined}
                    onChange={(status) => {
                      handleSorterChange([columnKey, status]);
                    }}
                  />
                )}
              </th>
            );
          })}
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
      key: PropTypes.string,
      title: PropTypes.string.isRequired,
    })
  ),
  selectable: PropTypes.bool,
  onSortChange: PropTypes.func,
};

function useHeads(columns) {
  return React.useMemo(() => getColumnsHeads(columns), [columns]);
}

function useSorter(onSortChange) {
  const [sorter, setSorter] = React.useState([]);
  const handleSortChange = useEventCallback(onSortChange);

  console.debug(sorter);

  React.useEffect(() => {
    if (sorter.length === 2) handleSortChange(...sorter);
  }, [handleSortChange, sorter]);

  return [sorter, setSorter];
}
