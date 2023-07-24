import { Api } from "@/src/api";
import * as ImagePicker from "expo-image-picker";
import { useBetterState } from "@/src/hooks/useBetterState";
import { Person } from "@/src/interfaces/Person";
import { isLoading } from "@/src/reduxStore/slices/loader";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";

export const usePersonInfoController = () => {
  const dispatch = useDispatch();
  const avatar = useBetterState<ImagePicker.ImagePickerAsset | null>(null);
  const { replace } = useRouter();

  const handlerAvatar = (asset: ImagePicker.ImagePickerAsset | null) =>
    (avatar.value = asset);

  const handlerCreatePerson = useCallback(
    async (values: Person) => {
      try {
        if (!avatar.value ) return;

        const { uri, type } = avatar.value
        const fileName = avatar.value.uri.split("/").pop();

        if(!uri || !fileName || !type)return

        dispatch(isLoading(true));
        const formData = new FormData();
        formData.append(
          "avatar",
          {
            uri: uri,
            name: fileName,
            type: type +'/'+fileName.split(".").pop(),
          } as any,
          fileName
        );

        for (const [key, value] of Object.entries(values)) {
          formData.append(key, value);
        }

        await Api.persson
          .create(formData)
          .then(({ data }) => {
            //console.log(data);
            replace("root/main");
          })
          .finally(() => {
            dispatch(isLoading(false));
          });
      } catch (error) {
        console.log({ error });
      } 
    },
    [avatar]
  );
  return { handlerCreatePerson, handlerAvatar };
};
