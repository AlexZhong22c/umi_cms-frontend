import { useState, useRef } from 'react';

export default function useStateNewest (init) {
  const [value, setValue] = useState(init);
  const ref = useRef(init);
  function setState(v) {
      setValue(v);
      ref.current = v;
  }
  return [value, setState, ref];
}
