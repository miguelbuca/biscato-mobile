import { useColorScheme } from "nativewind";

export const useHeaderBackgroundController = () => {
  const { colorScheme } = useColorScheme();

  return {
    colorScheme,
  };
};
