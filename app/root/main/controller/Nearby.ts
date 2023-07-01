import { Api } from "@/src/api";
import { requestLocationPermission } from "@/src/helper/location";
import { useBetterState } from "@/src/hooks/useBetterState";
import { Address } from "@/src/interfaces";
import { LocationObject } from "expo-location";
import { useCallback, useEffect } from "react";

export const useNearbyController = () => {
  const location = useBetterState<LocationObject | null>(null);
  const nearbyWorkLocations = useBetterState<Address[]>([]);

  const loadNearbyWorkLocations = useCallback(async () => {
    if (!location.value?.coords) return;

    const { latitude: lat, longitude: lng } = location.value?.coords;

    const { data } = await Api.address.nearby(lat, lng);

    nearbyWorkLocations.value = data;
  }, [location]);

  const load = () => {
    requestLocationPermission((res) => {
      location.value = res;
    });

    loadNearbyWorkLocations();
  };

  useEffect(load, []);
  return {
    nearbyWorkLocations,
    location,
  };
};
