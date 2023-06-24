import { Region } from "react-native-maps";

import axios from "axios";

export const GoogleFunction = (googleMapsApiKey: string) => {
  const geocode = async (coords: Pick<Region, "latitude" | "longitude">) => {
    return axios.get<GeocoderResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${googleMapsApiKey}`
    );
  };

  return {
    geocode,
  };
};
