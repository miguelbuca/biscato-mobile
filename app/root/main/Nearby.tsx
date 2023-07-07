import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { useNearbyController } from "./controller";
import { SvgXml } from "react-native-svg";
import normalize from "@/src/helper/normalize";
import { format } from "@/src/helper/format";
import { Modalize } from "react-native-modalize";

const Nearby = () => {
  const { location, nearbyWorkLocations } = useNearbyController();
  return (
    <View className="flex-1">
      {location.value?.coords ? (
        <MapView
          region={{
            latitude: location.value?.coords.latitude,
            longitude: location.value?.coords.longitude,
            latitudeDelta: 0.0922, // Set the desired zoom level (latitude span)
            longitudeDelta: 0.0421, // Set the desired zoom level (longitude span)
          }}
          showsBuildings
          loadingEnabled
          zoomControlEnabled
          style={StyleSheet.absoluteFill}
          showsUserLocation
          userLocationPriority="high"
          userLocationCalloutEnabled
        >
          <Circle
            center={{
              latitude: location.value?.coords.latitude,
              longitude: location.value?.coords.longitude,
            }}
            radius={1000}
            strokeWidth={1}
            strokeColor="#ae5333"
            fillColor="rgba(174, 0, 255, 0.1)"
          />

          {nearbyWorkLocations.value.map(
            ({ lat, lng, name, description, work }, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: lat || 0,
                  longitude: lng || 0,
                }}
              >
                <Callout tooltip>
                  <Pressable
                    onPress={() => {
                      alert("óla mundo");
                    }}
                    className="flex flex-row items-center border border-primary bg-primary rounded-[8px] mb-4"
                  >
                    <View className="flex items-center justify-center px-2">
                      <SvgXml
                        xml={work?.skillType?.svgXml || ``}
                        fill={"#fff"}
                        width={normalize(20)}
                        height={normalize(20)}
                      />
                    </View>
                    <View className="z-10 p-[2px]">
                      <View className="bg-[#fff] px-[13px] rounded-tr-[4px] rounded-br-[4px]">
                        <Text className="text-primary text-[13px] max-w-[200px] pt-[8px] font-black">
                          {work?.title}
                        </Text>
                        <Text className="text-primary text-[11px] max-w-[200px]  pb-[8px] font-normal">
                          {work?.skillType?.name}
                        </Text>
                        <View className="flex flex-row pb-2 items-center">
                          <Text className="font-semibold">
                            {format().amount(work?.costPerHour || 0)}
                          </Text>
                          <Text className="text-[10px]">(hora)</Text>
                        </View>
                      </View>
                    </View>
                  </Pressable>
                </Callout>
              </Marker>
            )
          )}
        </MapView>
      ) : null}
      <Modalize />
    </View>
  );
};
export default Nearby;
