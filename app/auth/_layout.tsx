import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
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
  );
}
