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
            headerShown: true,
          }}
        >
          <Stack.Screen
            options={{
              title: "Informações Pessoais",
            }}
            name="index"
          />
        </Stack>
      </Provider>
    </>
  );
}
