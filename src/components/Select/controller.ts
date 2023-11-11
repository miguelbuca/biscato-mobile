import { useColorScheme } from "nativewind";

export const useSelectController = () => {
  const { colorScheme } = useColorScheme();
  return { colorScheme };
};
