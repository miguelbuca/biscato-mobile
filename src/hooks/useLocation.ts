import { useCallback, useEffect } from "react";
import { requestLocationPermission } from "../helper/location";
import { Api } from "../api";
import { useBetterState } from "./useBetterState";
import { LocationObject } from "expo-location";
import { Region } from "react-native-maps";
import { Address } from "../interfaces";

export const useLocation = () => {
  const address = useBetterState<Address | null>(null);
  const location = useBetterState<LocationObject | null>(null);

  const handlerRegionChangeComplete = useCallback(async (value: Region) => {
    const { data } = await Api.external.google.geocode({
      latitude: value.latitude,
      longitude: value.longitude,
    });

    if (data) {
      address.value = {
        name: data.results?.[0]?.formatted_address,
        lat: value.latitude,
        lng: value.longitude,
      };
    }
  }, []);

  useEffect(() => {
    requestLocationPermission((res) => {
      location.value = res;

      handlerRegionChangeComplete({
        latitude: res?.coords.latitude || 0,
        longitude: res?.coords.longitude || 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      });
    });
  }, []);
  return {
    address,
    location,
  };
};
