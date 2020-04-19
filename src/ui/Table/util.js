import React from 'react';

import ColumnGroup from './ColumnGroup';

function isColumnGroupType(element) {
  return element.type === ColumnGroup;
}

export function getColumnsFromChildren(children) {
  return children != null
    ? React.Children.map(children, (child) => {
        const column = {
          key: child.key,
          ...child.props,
          children: isColumnGroupType(child)
            ? getColumnsFromChildren(child.props.children)
            : undefined,
        };

        column.key = getColumnKey(column);

        return column;
      })
    : children;
}

function getColumnKey(column) {
  const { key, dataIndex } = column;
  return key != null
    ? key
    : Array.isArray(dataIndex)
    ? dataIndex.join('.')
    : dataIndex;
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

export function getObjectValue(object, expression) {
  if (typeof expression === 'function') {
    return expression(object);
  }

  if (Array.isArray(expression)) {
    return expression.reduce((obj, key) => obj?.[key], object);
  }

  return object[expression];
}

export function orderBy(key, determiner) {
  return (prev, next) => {
    const [prevValue, nextValue] = [prev, next].map((data) =>
      String(getObjectValue(data, key.split('.')))
    );

    return (
      (prevValue < nextValue ? -1 : prevValue > nextValue ? 1 : 0) * determiner
    );
  };
}
