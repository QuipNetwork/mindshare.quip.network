import { useEffect } from 'react';

export function onMounted(callback: () => void) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
