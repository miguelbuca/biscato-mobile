import { Api } from "@/src/api";
import { requestLocationPermission } from "@/src/helper/location";
import { useBetterState } from "@/src/hooks/useBetterState";
import { useLocation } from "@/src/hooks/useLocation";
import { Address, Work } from "@/src/interfaces";
import { LocationObject } from "expo-location";
import { useNavigation } from "expo-router";
import { useEffect, useRef } from "react";
import { Modalize } from "react-native-modalize";

export const useNearbyController = () => {
  const location = useBetterState<LocationObject | null>(null);
  const nearbyWorkLocations = useBetterState<Address[]>([]);
  const modalizeRef = useRef<Modalize>(null);
  const { navigate }: any = useNavigation();
  const showDirections = useBetterState<boolean>(false);
  const selectedAddress = useBetterState<Address | null>(null);

  const { address } = useLocation();

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

  const handlerCloseModal = () => modalizeRef.current?.close();
  const handlerOpenModal = (address?: Address) => {
    if (!address) return;
    selectedAddress.value = address;
    modalizeRef.current?.open();
  };

  useEffect(load, []);

  return {
    address,
    showDirections,
    selectedAddress,
    modalizeRef,
    nearbyWorkLocations,
    location,
    handlerCloseModal,
    handlerOpenModal,
    navigate,
  };
};
