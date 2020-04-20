import { getObjectValue } from './object';

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
