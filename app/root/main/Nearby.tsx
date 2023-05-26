import { View, Text, StyleSheet } from "react-native";
import React from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { useNearbyController } from "./controller";

const Nearby = () => {
  const { location } = useNearbyController();

  return (
    <View className="flex-1">
      {location.value?.coords ? (
        <MapView
          region={{
            latitude: location.value?.coords.latitude,
            longitude: location.value?.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          }}
          showsBuildings
          loadingEnabled
          style={StyleSheet.absoluteFill}
        >
          <Marker
            coordinate={{
              latitude: location.value?.coords.latitude,
              longitude: location.value?.coords.longitude,
            }}
          >
            <Callout collapsable>
              <Text>Minha localização</Text>
            </Callout>
          </Marker>
        </MapView>
      ) : null}
    </View>
  );
};
export default Nearby;
