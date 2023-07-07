import Loader from "@/src/components/Loader";
import { store } from "@/src/reduxStore/store";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";

export default function Layout() {
  return (
    <>
      <Provider store={store}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            options={{
              title: "Publicar biscato",
              headerShown: true,
            }}
            name="Publication"
          />
          <Stack.Screen
            options={{
              title: "Localização",
              headerShown: true,
            }}
            name="Location"
          />
          <Stack.Screen
            options={{
              title: "Publicar trabalho",
              headerShown: true,
            }}
            name="Work"
          />
        </Stack>
        <Loader />
        <StatusBar style="dark" />
      </Provider>
    </>
  );
}
