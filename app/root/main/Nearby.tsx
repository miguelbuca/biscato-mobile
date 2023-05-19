import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { requestLocationPermission } from "@/src/helper/location";
import { useBetterState } from "@/src/hooks/useBetterState";
import { LocationObject } from "expo-location";

const Nearby = () => {
  const location = useBetterState<LocationObject | null>(null);
  useEffect(() => {
    requestLocationPermission((res) => {
      location.value = res;
    });
  }, []);

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
