import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";

export default function Layout() {
  const { colorScheme } = useColorScheme();
  return (
    <>
      <Stack
        screenOptions={{
          headerTransparent: true,
          headerTitleStyle: {
            color: colorScheme === "light" ? "#000" : "#fff",
          },
        }}
      >
        <Stack.Screen
          options={{
            title: "Criar conta",
          }}
          name="Sign-up"
        />
        <Stack.Screen
          options={{
            title: "Autenticação",
          }}
          name="Sign-in"
        />
      </Stack>
      <StatusBar style={colorScheme !== "light" ? "light" : "dark"} />
    </>
  );
}
