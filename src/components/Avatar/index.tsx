import {
  View,
  Text,
  ViewProps,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  Image,
  ImageStyle,
} from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import UserAvatarSvg from "@/src/assets/svg/user-avatar.svg";
import { useAvatarController } from "./controller";

export interface AvatarProps extends ViewProps {
  letters?: string;
  image?: string;
  fontStyles?: StyleProp<TextStyle>;
  withUpload?: boolean;
  imageStyle?: StyleProp<ImageStyle>;
  onUpload?: (asset: ImagePicker.ImagePickerAsset | null) => void;
}

export const Avatar = ({
  image,
  fontStyles,
  letters,
  withUpload,
  onUpload,
  imageStyle,
  ...args
}: AvatarProps) => {
  const { image: uploadedImage, handlerPickImage } =
    useAvatarController(onUpload);

  return (
    <>
      <View
        style={{
          borderColor: "rgba(0,0,0,0.1)",
        }}
        className="bg-white h-16 w-16  border-4 rounded-full items-center justify-center"
        {...args}
      >
        {!image && !withUpload ? (
          <Text style={fontStyles} className="text-xl font-bold">
            {letters}
          </Text>
        ) : (
          <>
            {!image && !uploadedImage.value ? (
              <UserAvatarSvg height={35} width={35} fill={"#ccc"} />
            ) : (
              <Image
                style={
                  image
                    ? imageStyle
                      ? imageStyle
                      : {
                          borderColor: "white",
                          borderWidth: 2,
                        }
                    : undefined
                }
                className="h-[85] w-[85] rounded-[50px]"
                source={{
                  uri: uploadedImage.value?.uri || image,
                }}
              />
            )}
          </>
        )}
      </View>
      {withUpload && (
        <TouchableOpacity onPress={handlerPickImage}>
          <Text className="mt-6 text-blue-500">Clique para carregar foto</Text>
        </TouchableOpacity>
      )}
    </>
  );
};
