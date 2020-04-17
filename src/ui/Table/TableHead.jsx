import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TableHeaderSorter from './TableHeadSorter';
import { getColumnsFromChildrenHeads, omitDefaultSpan } from './util';

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
                <Sorter
                  status={sortKey === column.key ? sortStatus : undefined}
                  onChange={(status) => {
                    handleSorterChange([column.key, status]);
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
  onSortChange: PropTypes.func,
};

function useHeads(columns) {
  return React.useMemo(() => getColumnsFromChildrenHeads(columns), [columns]);
}

function useSorter(onSortChange) {
  const [sorter, setSorter] = React.useState([]);
  const handleSortChange = useEventCallback(onSortChange);

  React.useEffect(() => {
    if (sorter.length === 2) handleSortChange(...sorter);
  }, [handleSortChange, sorter]);

  return [sorter, setSorter];
}
