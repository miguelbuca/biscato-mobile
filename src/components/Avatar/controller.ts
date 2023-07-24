import { useBetterState } from "@/src/hooks/useBetterState";
import * as ImagePicker from "expo-image-picker";
import { useEffect } from "react";

export const useAvatarController = (
  onUpload?: (asset: ImagePicker.ImagePickerAsset | null) => void
) => {
  const image = useBetterState<ImagePicker.ImagePickerAsset | null>(null);

  useEffect(() => {
    image.value && onUpload?.(image.value);
  }, [image]);

  const handlerPickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      image.value = result.assets[0];
    }
  };

  return {
    image,
    handlerPickImage,
  };
};
