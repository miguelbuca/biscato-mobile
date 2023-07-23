import { Api } from "@/src/api";
import { useBetterState } from "@/src/hooks/useBetterState";
import { Person } from "@/src/interfaces/Person";
import { isLoading } from "@/src/reduxStore/slices/loader";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export const usePersonInfoController = () => {
  const dispatch = useDispatch()
  const avatar = useBetterState<string>("");

  const handlerAvatar = (url: string) => (avatar.value = url);

  const handlerCreatePerson = useCallback(async (values: Person) => {
    try {
      dispatch(isLoading(true))
      console.log({
        ...values,
        avatar
      })
      /*const { data } = await Api.persson.create({
        ...values,
      });

      console.log(data);*/
    } catch (error) {
      console.log({ error });
    }finally{
      //dispatch(isLoading(false))
    }
  }, [avatar]);
  return { handlerCreatePerson, handlerAvatar };
};
