import React from 'react';

import ColumnGroup from './ColumnGroup';

function isColumnGroupType(element) {
  return element.type === ColumnGroup;
}

export function getColumnProps(children) {
  return children != null
    ? React.Children.map(children, (child) => {
        const { props, key } = child;
        return {
          key,
          ...props,
          children: isColumnGroupType(child)
            ? getColumnProps(props.children)
            : undefined,
        };
      })
    : children;
}

export function getColumnKey(column) {
  const { key, dataIndex } = column;
  return key != null
    ? key
    : Array.isArray(dataIndex)
    ? dataIndex.join('.')
    : dataIndex;
}

export function getColumnsHeads(columns) {
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
}

export function getColumnData(data, column) {
  const { dataIndex } = column;

  return Array.isArray(dataIndex)
    ? dataIndex.reduce((map, key) => map[key], data)
    : data[dataIndex];
}

export function getFlattenColumns(columns) {
  return columns?.reduce((list, column) => {
    if (column.children != null) {
      list.push(...getFlattenColumns(column.children));
    } else {
      list.push(column);
    }
    return list;
  }, []);
}

const DEFAULT_SPAN = 1;
export function omitDefaultSpan(span) {
  return span !== DEFAULT_SPAN ? span : undefined;
}
