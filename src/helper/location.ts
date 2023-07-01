import * as Location from "expo-location";

/**
 * This method request the permissions for approximate and exact device location. It also needs the foreground service permission to subscribe to location updates, while the app is in use.
 * @param callback
 */
export const requestLocationPermission = async (
  callback?: (
    location: Location.LocationObject | null,
    error: string | null
  ) => void
) => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    callback && callback(null, "Permission to access location was denied");
    return;
  }
  let loc: Location.LocationObject;
  if (__DEV__) {
    loc = {
      coords: {
        accuracy: null,
        altitude: null,
        altitudeAccuracy: null,
        heading: 0,
        latitude: 41.161865,
        longitude: -8.604174,
        speed: 0,
      },
      mocked: true,
      timestamp: Date.now(),
    };
  } else {
    loc = await Location.getCurrentPositionAsync({
      distanceInterval: 5000,
    });
  }
  callback && callback(loc, null);
  return loc;
};
