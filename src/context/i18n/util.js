export function flattenMessage(nestedMessages, prefix = '') {
  if (nestedMessages === null) return {};

  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      Object.assign(messages, { [prefixedKey]: value });
    } else {
      Object.assign(messages, flattenMessage(value, prefixedKey));
    }

    return messages;
  }, {});
}
