import { useBetterState } from "@/src/hooks/useBetterState";
import * as ImagePicker from "expo-image-picker";

export const useAvatarController = () => {
  const image = useBetterState<string>("");

  const handlerPickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      image.value = result.assets[0].uri;
    }
  };

  return {
    image,
    handlerPickImage,
  };
};
