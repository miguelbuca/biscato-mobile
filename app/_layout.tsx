import { store } from "@/src/reduxStore/store";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";

export default function Layout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          options={{
            title: "Publicar trabalho",
            headerShown: true,
          }}
          name="Publication"
        />
      </Stack>
      <StatusBar style="dark" />
    </Provider>
  );
}
