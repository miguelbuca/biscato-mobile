import HeaderBackground from "@/src/components/HeaderBackground";
import Loader from "@/src/components/Loader";
import { SocketProvider } from "@/src/contexts/socket";
import { ToastProvider } from "@/src/contexts/toast";
import { store } from "@/src/reduxStore/store";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { useLayoutNotification } from "./controller";

export default function Layout() {
  const { colorScheme } = useColorScheme();
  const {} = useLayoutNotification()
  return (
    <>
      <Provider store={store}>
        <ToastProvider>
          <SocketProvider>
            <Stack
              screenOptions={{
                headerShown: false,
                headerTitleStyle: {
                  color: colorScheme === "light" ? "#000" : "#fff",
                },
              }}
            >
              <Stack.Screen
                options={{
                  title: "Publicar biscato",
                  headerShown: true,
                  headerTransparent: true,
                  headerBackground: () => <HeaderBackground />,
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
                  headerShown: true,
                }}
                name="Work"
              />
              <Stack.Screen
                options={{
                  title: "Chat",
                  headerShown: true,
                  headerShadowVisible: false,
                  headerBackTitleVisible: false,
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
              <Stack.Screen
                options={{
                  headerShown: true,
                  title: "Candidatos",
                  headerTransparent: true,
                  headerBackground: () => <HeaderBackground />,
                }}
                name="CandidatesList"
              />
              <Stack.Screen
                options={{
                  headerShown: true,
                  title: "Formas de Pagamento",
                }}
                name="SwitchPaymentMethod"
              />
              <Stack.Screen
                options={{
                  headerShown: true,
                  title: "Portfólio",
                  headerTransparent: true,
                  headerBackground: () => <HeaderBackground />,
                }}
                name="Portfolio"
              />
            </Stack>
            <Loader />
            <StatusBar style="dark" />
          </SocketProvider>
        </ToastProvider>
      </Provider>
      <StatusBar style={colorScheme !== "light" ? "light" : "dark"} />
    </>
  );
}
