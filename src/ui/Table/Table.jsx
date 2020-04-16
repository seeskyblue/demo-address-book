import React from 'react';
import PropTypes from 'prop-types';

import Column from './Column';
import ColumnGroup from './ColumnGroup';
import TableHead from './TableHead';
import TableBody from './TableBody';
import { getColumnProps } from './util';

export default function Table(props) {
  const { data, children } = props;

  const columns = useColumns(children);

  return (
    <table>
      <colgroup>{children}</colgroup>
      <TableHead columns={columns} />
      <TableBody columns={columns} data={data} />
    </table>
  );
}

Table.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  data: PropTypes.arrayOf(PropTypes.object),
};

Table.Column = Column;
Table.ColumnGroup = ColumnGroup;
Table.Head = TableHead;
Table.Body = TableBody;

function useColumns(children) {
  const [columns, setColumns] = React.useState();

  React.useEffect(() => {
    setColumns(getColumnProps(children));
  }, [children]);

  return columns;
}
