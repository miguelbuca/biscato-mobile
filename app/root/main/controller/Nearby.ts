import { Api } from "@/src/api";
import { requestLocationPermission } from "@/src/helper/location";
import { useBetterState } from "@/src/hooks/useBetterState";
import { Address } from "@/src/interfaces";
import { LocationObject } from "expo-location";
import { useCallback, useEffect } from "react";

export const useNearbyController = () => {
  const location = useBetterState<LocationObject | null>(null);
  const nearbyWorkLocations = useBetterState<Address[]>([]);

  const load = () => {
    requestLocationPermission((res) => {
      if (!res) return;
      location.value = res;

      const { latitude: lat, longitude: lng } = res.coords;

      Api.address.nearby(lat, lng).then(({ data }) => {
        nearbyWorkLocations.value = data;
      });
    });
  };

  useEffect(load, []);

  return {
    nearbyWorkLocations,
    location,
  };
};
