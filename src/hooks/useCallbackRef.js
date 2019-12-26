import { useEffect, useRef, useCallback } from 'react';
/**
 * 在watch deps并且update deps的同时，利用useCallback返回不变的函数引用：
 */
export default function useRefCallback(fn, dependencies) {
  const ref = useRef(fn);

  useEffect(() => {
    ref.current = fn;
  }, [fn, ...dependencies]);

  return useCallback(() => {
    const fn = ref.current;
    return fn();
  }, [ref]);
}
