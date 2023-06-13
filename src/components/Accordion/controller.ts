import { useBetterState } from "@/src/hooks/useBetterState";
import { useEffect } from "react";

export const useAccordionController = (state: boolean) => {
  const display = useBetterState(false);

  useEffect(() => {
    display.value = state;
  }, [state]);

  return {
    display,
  };
};
