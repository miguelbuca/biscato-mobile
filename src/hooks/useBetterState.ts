import { useState } from "react";

export const useBetterState = <T>(value: T) => {
  const [state, setState] = useState(value);
  return {
    get value() {
      return state;
    },
    set value(v) {
      setState(v);
    },
  };
};
