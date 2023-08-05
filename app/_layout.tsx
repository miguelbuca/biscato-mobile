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
          <Stack.Screen
            options={{
              title: "Chat",
              headerShown: true,
            }}
            name="Chat"
          />
          <Stack.Screen
            options={{
              headerShown: true,
              title: "Competências",
              headerSearchBarOptions: {
                inputType: "text",
                placeholder: "Escreva aqui...",
              },
            }}
            name="Find-job"
          />
        </Stack>
        <Loader />
        <StatusBar style="dark" />
      </Provider>
    </>
  );
}
