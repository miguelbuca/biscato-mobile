import { Api } from "@/src/api";
import { requestLocationPermission } from "@/src/helper/location";
import { useBetterState } from "@/src/hooks/useBetterState";
import { Address, Work } from "@/src/interfaces";
import { isLoading } from "@/src/reduxStore/slices/loader";
import { LocationObject } from "expo-location";
import { useLocalSearchParams, useRouter, useSearchParams } from "expo-router";
import { useCallback, useEffect } from "react";
import { Region } from "react-native-maps";
import { useDispatch } from "react-redux";

export const useLocationController = () => {
  const dispatch = useDispatch();
  const location = useBetterState<LocationObject | null>(null);
  const address = useBetterState<Address | null>(null);
  const { work } = useLocalSearchParams<any>();
  const { replace }   = useRouter()

  const handlerCancel = () => {
    address.value = null;
    handlerCreate();
  };
  const handlerCreate = useCallback( () => {
    try {
      dispatch(isLoading(true));
      Api.work
        .create({
          ...work,
          costPerHour: parseFloat(`${work?.costPerHour}`),
          skillTypeId: parseInt(`${work?.skillTypeId}`),
          totalTime: parseInt(`${work?.totalTime}`),
          address: address.value
            ? {
                ...address.value,
              }
            : undefined,
        })
        .then(({ data })=>{
          replace('./root/main/Home')
        })
        .finally(() => {
          dispatch(isLoading(false));
        });
    } catch (error) {
      console.log({ error });
    }
  }, [work, address]);

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

  return {
    address,
    location,
    handlerRegionChangeComplete,
    handlerCreate,
    handlerCancel,
  };
};
