import { useMemo } from "react";

export const useWorkCardController = () => {
  const randomBool = useMemo(() => Math.random() < 0.5, []);
  return { randomBool };
};
