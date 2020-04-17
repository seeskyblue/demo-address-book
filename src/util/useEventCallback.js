import React from 'react';

export default function useEventCallback(fn) {
  const ref = React.useRef(fn);
  React.useEffect(() => {
    ref.current = fn;
  });
  return React.useCallback((...args) => (0, ref.current)?.(...args), []);
}
