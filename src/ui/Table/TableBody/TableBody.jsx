import React from 'react';
import PropTypes from 'prop-types';

import { getFlattenColumns, getObjectValue } from '../util';

export default function TableBody(props) {
  const { columns, dataSource, dataKey, selectable } = props;
  const flattenColumns = useFlattenColumns(columns);

  return (
    <tbody>
      {dataSource?.map((data) => (
        <tr key={getObjectValue(data, dataKey)}>
          {selectable && (
            <th>
              <input type="checkbox" />
            </th>
          )}
          {flattenColumns?.map((column) => (
            <td key={column.key}>{getObjectValue(data, column.dataIndex)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

TableBody.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      children: PropTypes.arrayOf(PropTypes.object),
      dataIndex: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.func,
      ]),
      key: PropTypes.string.isRequired,
    })
  ),
  dataKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.func,
  ]),
  dataSource: PropTypes.arrayOf(PropTypes.object),
  selectable: PropTypes.bool,
};

function useFlattenColumns(columns) {
  return React.useMemo(() => getFlattenColumns(columns), [columns]);
}
