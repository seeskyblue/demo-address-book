import React from 'react';
import PropTypes from 'prop-types';

import { getFlattenColumns } from '../util';

import Checkbox from 'ui/Checkbox';
import { getObjectValue } from 'util/object';

export default function TableBody(props) {
  const {
    columns,
    dataSource,
    dataKey,
    selectable,
    selectedKeys = [],
    onSelect,
  } = props;
  const flattenColumns = useFlattenColumns(columns);

  const handleSelect = (key, checked) => {
    onSelect?.(key, checked);
  };

  return (
    <tbody>
      {dataSource?.map((data) => {
        const key = getObjectValue(data, dataKey);
        return (
          <tr key={key}>
            {selectable && (
              <th scope="row">
                <Checkbox
                  size={18}
                  checked={selectedKeys?.includes(key)}
                  value={key}
                  onChange={handleSelect}
                />
              </th>
            )}
            {flattenColumns?.map((column) => {
              const value = getObjectValue(data, column.dataIndex);
              return (
                <td key={column.key}>
                  {column.render != null
                    ? column.render(value, data, column)
                    : value}
                </td>
              );
            })}
          </tr>
        );
      })}
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
      render: PropTypes.func,
    })
  ),
  dataKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.func,
  ]),
  dataSource: PropTypes.arrayOf(PropTypes.object),
  selectable: PropTypes.bool,
  selectedKeys: PropTypes.arrayOf(PropTypes.any),
  onSelect: PropTypes.func,
};

function useFlattenColumns(columns) {
  return React.useMemo(() => getFlattenColumns(columns), [columns]);
}
