import { useNavigation, useRouter } from "expo-router";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

import { theme } from "@/tailwind.config";

import Slide1 from "@/src/assets/svg/intro/undraw_coffee_break_h3uu.svg";
import Slide2 from "@/src/assets/svg/intro/undraw_time_management_re_tk5w.svg";
import Slide3 from "@/src/assets/svg/intro/undraw_under_construction_-46-pa.svg";
import { useCallback, useEffect } from "react";

import { save, getValueFor } from "@/src/helper/storage";
import { Api } from "@/src/api";
import { useBetterState } from "@/src/hooks/useBetterState";
import { SplashScreen } from "@/src/components";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "@/src/reduxStore/slices/auth";

export default function Page() {
  const isReady = useBetterState<boolean>(false);
  const { navigate } = useNavigation();
  const { replace } = useRouter();
  const dispatch = useDispatch();
  const slides = [
    {
      key: 1,
      title: "Despertando sua Coragem e Potencial",
      text: "Seja corajoso e ousado ao buscar o seu biscato! Lembre-se de que cada grande jornada começa com um pequeno passo. Permita que sua paixão e sua determinação guiem você pelo caminho da realização. Não tenha medo de arriscar, de tentar algo novo e de sair da sua zona de conforto",
      image: <Slide1 />,
    },
    {
      key: 2,
      title: "Economize tempo",
      text: "Não perca mais tempo procurando por um profissional qualificado. Com o nosso aplicativo de biscato, você pode encontrar facilmente um trabalhador independente para qualquer tarefa, em poucos minutos",
      image: <Slide2 />,
    },
    {
      key: 3,
      title: "Encontre seu Biscateiro dos Sonhos!",
      text: "Precisa de ajuda para resolver aquele problema em casa? Seja qual for a sua necessidade, há um biscateiro esperando para trazer sua expertise e habilidades para o seu projeto.",
      image: <Slide3 />,
    },
  ];

  const load = useCallback(async () => {
    const [access_token, appIntroSlider] = await Promise.all([
      getValueFor("access_token"),
      getValueFor("AppIntroSlider"),
    ]);

    if (access_token) {
      try {
        const { data } = await Api.user.me();
        dispatch(setCurrentUser(data));
        replace("root/main");
      } catch (error) {
        replace("auth/Sign-in");
      }
    } else {
      if (!appIntroSlider) save("AppIntroSlider", "true");
      else replace("auth/Sign-up");
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      isReady.value = true;
    }, 1000);
  }, []);

  return isReady ? (
    <SplashScreen onLayout={load} />
  ) : (
    <AppIntroSlider
      onLayout={load}
      style={StyleSheet.absoluteFill}
      renderItem={({ item: { title, text, image } }) => {
        return (
          <View
            style={{
              backgroundColor: "#f5f5f5",
            }}
            className={`flex flex-col flex-1 items-center justify-center`}
          >
            <View className="flex items-center justify-center h-[300px]">
              {image}
            </View>
            <View className="max-w-[300px]">
              <Text className="text-xl text-center">{title}</Text>
            </View>
            <View className="mt-2 max-w-[300px]">
              <Text className="text-xs text-center">{text}</Text>
            </View>
          </View>
        );
      }}
      data={slides}
      activeDotStyle={{
        backgroundColor: (theme?.extend?.colors as { primary: string }).primary,
        width: 30,
      }}
      renderNextButton={() => (
        <Text className="text-base mt-2 text-primary font-semibold">
          Próximo
        </Text>
      )}
      renderDoneButton={() => (
        <TouchableOpacity
          onPress={() =>
            navigate(
              "auth" as never,
              {
                screen: "Sign-up",
              } as never
            )
          }
        >
          <Text className="text-base mt-2 text-primary font-semibold">
            Finalizar
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}
