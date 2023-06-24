import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import React from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { useLocationController } from "./controller/Location";
import normalize from "@/src/helper/normalize";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/src/components";

import JobLocationSvg from "@/src/assets/svg/job-location.svg";

const { width, height } = Dimensions.get("screen");

export default function Location() {
  const {
    location,
    address,
    handlerRegionChangeComplete,
    handlerCreate,
    handlerCancel,
  } = useLocationController();

  return (
    <View className="relative flex-1">
      <View
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: [
            { translateX: (width - 50) / 2 },
            {
              translateY:
                -(height - normalize(230)) / 2 + normalize(200) - normalize(15),
            },
          ],
          zIndex: 999,
        }}
      >
        <JobLocationSvg height={50} width={50} />
      </View>
      {location.value?.coords ? (
        <MapView
          region={{
            latitude: location.value?.coords.latitude,
            longitude: location.value?.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          }}
          mapPadding={{
            bottom: normalize(200),
            left: 10,
            right: 10,
            top: 10,
          }}
          showsBuildings
          loadingEnabled
          style={StyleSheet.absoluteFill}
          onRegionChangeComplete={handlerRegionChangeComplete}
        ></MapView>
      ) : null}
      <View
        style={{
          minHeight: normalize(230),
        }}
        className="absolute bottom-0 self-center w-[90%] rounded-t-2xl bg-white p-4 flex flex-col"
      >
        <View className="flex-1 items-center justify-center">
          <Text
            className="font-bold text-lg"
            lineBreakMode="tail"
            ellipsizeMode="tail"
          >
            {address.value?.name}
          </Text>
        </View>

        <View className="flex flex-row gap-x-3 mb-4">
          <View className="flex-1">
            <Button
              title="Ignorar"
              className="bg-gray-300"
              textClassName="text-black"
              onPress={handlerCancel}
            />
          </View>
          <View className="flex-1">
            <Button title="Finalizar" onPress={handlerCreate} />
          </View>
        </View>
      </View>
    </View>
  );
}
