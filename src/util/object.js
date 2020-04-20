function getExpressionKeys(expression) {
  return typeof expression === 'string'
    ? expression.split('.')
    : Array.isArray(expression)
    ? expression
    : null;
}

export function getObjectValue(object, expression) {
  if (object == null) return object;

  if (typeof expression === 'function') {
    return expression(object);
  }

  return getExpressionKeys(expression)?.reduce(
    (obj, key) => obj?.[key],
    object
  );
}

export function setObjectValue(object, expression, value) {
  if (object == null) return object;

  if (typeof expression === 'function') {
    return expression(object, value);
  }

  getExpressionKeys(expression)?.reduce((obj, key, index, keys) => {
    if (index < keys.length - 1) {
      obj[key] = obj[key] ?? {};
      return obj[key];
    }

    obj[key] = value;
  }, object);
}
