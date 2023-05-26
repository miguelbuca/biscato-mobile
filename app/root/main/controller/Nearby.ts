import { requestLocationPermission } from "@/src/helper/location";
import { useBetterState } from "@/src/hooks/useBetterState";
import { LocationObject } from "expo-location";
import { useEffect } from "react";

export const useNearbyController = () => {
  const location = useBetterState<LocationObject | null>(null);
  useEffect(() => {
    requestLocationPermission((res) => {
      location.value = res;
    });
  }, []);
  return {
    location,
  };
};
