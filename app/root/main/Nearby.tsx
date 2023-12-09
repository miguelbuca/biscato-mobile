import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React from "react";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { useNearbyController } from "./controller";
import { SvgXml } from "react-native-svg";
import normalize from "@/src/helper/normalize";
import { format } from "@/src/helper/format";
import { Modalize } from "react-native-modalize";
import { Button } from "@/src/components";

import UserDrirectionSvg from "@/src/assets/svg/user-direction.svg";
import * as Constants from "expo-constants";
import MapViewDirections from "react-native-maps-directions";

const Nearby = () => {
  const {
    person,
    address,
    showDirections,
    selectedAddress,
    modalizeRef,
    location,
    nearbyWorkLocations,
    handlerOpenModal,
    navigate,
  } = useNearbyController();
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
          mapPadding={{
            top: 50,
            bottom: 50,
            left: 10,
            right: 10
          }}
          showsBuildings
          zoomControlEnabled
          style={StyleSheet.absoluteFill}
          showsUserLocation
          collapsable={true}
          userLocationPriority="high"
          followsUserLocation={showDirections.value}
          
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
          {showDirections.value && address.value && selectedAddress.value && (
            <MapViewDirections
              apikey={Constants.default.expoConfig?.extra?.googleMapsApiKey}
              origin={{
                latitude: address.value?.lat as number,
                longitude: address.value?.lng as number,
              }}
              destination={{
                latitude: selectedAddress.value?.lat as number,
                longitude: selectedAddress.value?.lng as number,
              }}
              strokeColor="rgba(86, 86, 116, 0.5)"
              strokeWidth={3}
              mode="DRIVING"
            />
          )}

          {nearbyWorkLocations.value.map(({ lat, lng, work }, index) => (
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
                    showDirections.value = false;
                    handlerOpenModal(nearbyWorkLocations.value[index]);
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
          ))}
        </MapView>
      ) : null}
      <Modalize
        ref={modalizeRef}
        modalHeight={
          selectedAddress.value?.work?.description
            ? normalize(300)
            : normalize(200)
        }
        handlePosition="inside"
        withReactModal
        HeaderComponent={
          <View className="flex flex-row items-center p-4 mt-2 border-b border-b-slate-100">
            <Text className="font-bold">
              {selectedAddress.value?.work?.title}
            </Text>
            <View
              style={{
                backgroundColor:
                  selectedAddress.value?.work?.skillType?.background,
              }}
              className="ml-2 p-2 border-l rounded-lg border-slate-100"
            >
              <Text className="text-white text-[10px]">
                {selectedAddress.value?.work?.skillType?.name}
              </Text>
            </View>
          </View>
        }
        FooterComponent={
          <View className="flex flex-row p-4 py-6">
            <View className="flex-1">
              <Button
                onPress={() => {
                  showDirections.value = true;
                  modalizeRef.current?.close();
                }}
                leftElement={
                  <View className="mr-2">
                    <UserDrirectionSvg
                      height={normalize(25)}
                      width={normalize(25)}
                      fill={"#fff"}
                    />
                  </View>
                }
                textClassName="text-[#fff] font-[500]"
                className="rounded-full flex-0 bg-tertiary border-[#000] mr-2"
                title="Direções"
              />
            </View>
            <View className="flex-1">
              <Button
                onPress={() => {
                  navigate("Work", {
                    ...selectedAddress.value,
                  });
                  modalizeRef.current?.close();
                }}
                className="rounded-full "
                title="Saber mais"
              />
            </View>
          </View>
        }
      >
        <View className="p-4">
          <Text
            style={{
              overflow: "hidden",
            }}
            numberOfLines={5}
            ellipsizeMode="tail"
          >
            {selectedAddress.value?.work?.description}
          </Text>
        </View>
      </Modalize>
    </View>
  );
};
export default Nearby;
