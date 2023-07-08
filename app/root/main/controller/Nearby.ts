import { Api } from "@/src/api";
import { requestLocationPermission } from "@/src/helper/location";
import { useBetterState } from "@/src/hooks/useBetterState";
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

  const selectedWork = useBetterState<Work | null>(null);

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
  const handlerOpenModal = (work?: Work) => {
    if (!work) return;
    selectedWork.value = work;
    modalizeRef.current?.open();
  };

  useEffect(load, []);

  return {
    selectedWork,
    modalizeRef,
    nearbyWorkLocations,
    location,
    handlerCloseModal,
    handlerOpenModal,
    navigate,
  };
};
