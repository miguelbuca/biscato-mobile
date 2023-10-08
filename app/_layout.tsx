import Loader from "@/src/components/Loader";
import { SocketProvider } from "@/src/contexts/socket";
import { ToastProvider } from "@/src/contexts/toast";
import { store } from "@/src/reduxStore/store";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";

export default function Layout() {
  return (
    <>
      <Provider store={store}>
        <ToastProvider>
          <SocketProvider>
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
            </Stack>
            <Loader />
            <StatusBar style="dark" />
          </SocketProvider>
        </ToastProvider>
      </Provider>
    </>
  );
}
