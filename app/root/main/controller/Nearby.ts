import { Api } from "@/src/api";
import { requestLocationPermission } from "@/src/helper/location";
import { useBetterState } from "@/src/hooks/useBetterState";
import { useLocation } from "@/src/hooks/useLocation";
import { Address, Person, Work } from "@/src/interfaces";
import { AuthSelectors } from "@/src/reduxStore/slices/auth";
import { LocationObject } from "expo-location";
import { useNavigation } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect, useMemo, useRef } from "react";
import { Modalize } from "react-native-modalize";
import { useSelector } from "react-redux";

export const useNearbyController = () => {
  const location = useBetterState<LocationObject | null>(null);
  const nearbyWorkLocations = useBetterState<Address[]>([]);
  const modalizeRef = useRef<Modalize>(null);
  const { navigate }: any = useNavigation();
  const showDirections = useBetterState<boolean>(false);
  const selectedAddress = useBetterState<Address | null>(null);
  const person: Person = useSelector(AuthSelectors)?.activePerson;
  const { colorScheme } = useColorScheme();

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

  const mapStyle  = useMemo(()=>{
    if(colorScheme !== 'dark')return undefined
    else return [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#181818"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1b1b1b"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#2c2c2c"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8a8a8a"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#373737"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#3c3c3c"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#4e4e4e"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#3d3d3d"
          }
        ]
      }
    ]
  },[colorScheme])

  return {
    mapStyle,
    address,
    showDirections,
    selectedAddress,
    modalizeRef,
    nearbyWorkLocations,
    location,
    handlerCloseModal,
    handlerOpenModal,
    navigate,
    person
  };
};
