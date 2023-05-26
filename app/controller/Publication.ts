import { Api } from "@/src/api";
import { Work } from "@/src/interfaces";
import { useCallback } from "react";

export const usePublicationController = () => {
  const handlerCreateWork = useCallback(async (values: Work) => {
    try {
      const { data } = await Api.work.create(values);

      console.log(data);
    } catch (error) {
      console.log({ error });
    }
  }, []);

  return {
    handlerCreateWork,
  };
};
