import React from 'react';
import PropTypes from 'prop-types';

import { getColumnKey, getColumnsHeads, omitDefaultSpan } from './util';

export default function TableHead(props) {
  const { columns } = props;
  const heads = useHeads(columns);
  const headRows = heads.length;

  return (
    <thead>
      {heads.map((headColumns, rowIndex) => (
        <tr key={rowIndex}>
          {headColumns?.map((column) => {
            const { children, title, colSpan } = column;
            const hasChildren = children != null;
            const rowSpan = hasChildren ? 1 : headRows - rowIndex;
            return (
              <th
                key={getColumnKey(column)}
                rowSpan={omitDefaultSpan(rowSpan)}
                colSpan={omitDefaultSpan(colSpan)}
                scope={hasChildren ? 'colgroup' : 'col'}
              >
                {title}
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
};

function useHeads(columns) {
  return React.useMemo(() => getColumnsHeads(columns), [columns]);
}
