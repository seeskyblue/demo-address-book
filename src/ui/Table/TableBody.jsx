import React from 'react';
import PropTypes from 'prop-types';

import { getColumnData, getColumnKey, getFlattenColumns } from './util';

export default function TableBody(props) {
  const { columns, data } = props;
  const flattenColumns = useFlattenColumns(columns);

  return (
    <tbody>
      {data?.map(({ key: dataKey, ...dataProps }) => (
        <tr key={dataKey}>
          {flattenColumns?.map((column) => (
            <td key={getColumnKey(column)}>
              {getColumnData(dataProps, column)}
            </td>
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
      ]),
      key: PropTypes.string,
    })
  ),
  data: PropTypes.arrayOf(PropTypes.object),
};

function useFlattenColumns(columns) {
  return React.useMemo(() => getFlattenColumns(columns), [columns]);
}
