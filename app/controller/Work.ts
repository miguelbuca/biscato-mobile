import { Api } from "@/src/api";
import { useBetterState } from "@/src/hooks/useBetterState";
import { SkillType, User, Work } from "@/src/interfaces";
import { AuthSelectors } from "@/src/reduxStore/slices/auth";
import { isLoading } from "@/src/reduxStore/slices/loader";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useColorScheme } from "nativewind";
import { useCallback, useEffect, useRef } from "react";
import { Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";

export const useWorkController = () => {
  const navigation: any = useNavigation();
  const user: User = useSelector(AuthSelectors)?.user;
  const scrollRef = useRef<KeyboardAwareScrollView>(null);
  const params: Work & { skillType?: SkillType } = useLocalSearchParams();
  const isMyWork = useBetterState<boolean>(false);
  const { colorScheme } = useColorScheme();
  const dispatch = useDispatch();

  const handlerCreateApplication = useCallback(async () => {
    try {
      if(isMyWork.value){
        /**
         * Usar o id da application
         */
       /* navigation.navigate('CandidatesList',{
          params:{
            id: params.id
          }
        })*/
        return
      }
      if (!params?.id || params.user?.id === user.id) return;
      dispatch(isLoading(true));
      await Api.application.create({
        workId: params.id,
      });
    } catch (error: any) {
      Alert.alert(error.response.data.message);
    } finally {
      dispatch(isLoading(false));
    }
  }, [params, user, isMyWork]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: params.skillType?.name,
      headerTitleStyle: {
        color: colorScheme === "dark" ? "#000" : "#fff",
      },
      headerTintColor: colorScheme === "dark" ? "#000" : "#fff",
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: params.skillType?.background,
      },
    });
  }, [colorScheme]);

  useEffect(() => {
    isMyWork.value = user.id === params.user?.id;
  }, [params, user]);

  return { params, scrollRef, handlerCreateApplication, isMyWork, colorScheme };
};
