import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';

import Column from './Column';
import ColumnGroup from './ColumnGroup';
import TableHead from './TableHead';
import TableBody from './TableBody';
import { getColumnsFromChildren } from './util';

const tableCSS = css`
  border-collapse: collapse;

  & caption {
    font-size: 18px;
    font-weight: bold;
  }

  &,
  & th,
  & td {
    border: 1px solid #f0f0f0;
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
  const { dataSource, dataKey, children, selectable = false, title } = props;

  const columns = useColumns(children);

  return (
    <table css={tableCSS}>
      {title && <caption>{title}</caption>}
      <colgroup>
        {selectable && <col />}
        {children}
      </colgroup>
      <TableHead columns={columns} selectable={selectable} />
      <TableBody
        columns={columns}
        dataSource={dataSource}
        dataKey={dataKey}
        selectable={selectable}
      />
    </table>
  );
}

Table.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  dataKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.func,
  ]),
  dataSource: PropTypes.arrayOf(PropTypes.object),
  selectable: PropTypes.bool,
  title: PropTypes.string,
};

Table.Column = Column;
Table.ColumnGroup = ColumnGroup;
Table.Head = TableHead;
Table.Body = TableBody;

function useColumns(children) {
  const [columns, setColumns] = React.useState();

  React.useEffect(() => {
    setColumns(getColumnsFromChildren(children));
  }, [children]);

  return columns;
}
