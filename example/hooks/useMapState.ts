import { useState, useEffect, useCallback } from "react";
import * as Location from "expo-location";
import type {
  MapPressEvent,
  MapType,
  CameraPositionChange,
  CameraPositionChangeEvent,
} from "native-maps";
import type { PresetLocation } from "../types";
import {
  DEFAULT_CAMERA_POSITION,
  updateCameraPosition,
  type UseMapStateReturn,
  type UseMapStateProps,
} from "./map-state";

export const useMapState = ({
  mapRef,
}: UseMapStateProps): UseMapStateReturn => {
  const [showSettings, setShowSettings] = useState(false);
  const [mapType, setMapType] = useState<MapType>("standard");
  const [showsUserLocation, setShowsUserLocation] = useState(false);
  const [animateCamera, setAnimateCamera] = useState(true);
  const [cameraPosition, setCameraPosition] = useState<CameraPositionChange>(
    DEFAULT_CAMERA_POSITION
  );
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false);

  const handleMapPress = useCallback((event: MapPressEvent) => {
    console.log("MapPressEvent: ", event.nativeEvent);
  }, []);

  const handleLocationPreset = useCallback(
    (location: PresetLocation) => {
      updateCameraPosition(mapRef, {
        latitude: location.latitude,
        longitude: location.longitude,
        zoom: location.zoom,
        animated: animateCamera,
      });
    },
    [mapRef, animateCamera]
  );

  const handleCameraPositionChange = useCallback(
    (event: CameraPositionChangeEvent) => {
      console.log("CameraPositionChangeEvent: ", event.nativeEvent);
      setCameraPosition({
        latitude: event.nativeEvent.latitude,
        longitude: event.nativeEvent.longitude,
        zoom: event.nativeEvent.zoom,
      });
    },
    []
  );

  const toggleSettings = useCallback(() => {
    setShowSettings((prev) => !prev);
  }, []);

  const requestLocationPermission = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      const granted = status === "granted";
      setLocationPermissionGranted(granted);

      if (granted) {
        setShowsUserLocation(true);
      } else {
        setShowsUserLocation(false);
      }
    } catch (error) {
      console.error("Error requesting location permission:", error);
      setLocationPermissionGranted(false);
      setShowsUserLocation(false);
    }
  }, []);

  // Check location permission status on mount
  useEffect(() => {
    const checkLocationPermission = async () => {
      try {
        const { status } = await Location.getForegroundPermissionsAsync();
        const granted = status === "granted";
        setLocationPermissionGranted(granted);

        if (granted) {
          setShowsUserLocation(true);
        }
      } catch (error) {
        console.error("Error checking location permission:", error);
        setLocationPermissionGranted(false);
      }
    };

    checkLocationPermission();
  }, []);

  return {
    // State
    showSettings,
    mapType,
    showsUserLocation,
    cameraPosition,
    animateCamera,
    locationPermissionGranted,

    // State setters
    setShowSettings,
    setMapType,
    setShowsUserLocation,
    setCameraPosition,
    setAnimateCamera,

    // Action handlers
    handleMapPress,
    handleLocationPreset,
    handleCameraPositionChange,
    toggleSettings,
    requestLocationPermission,
  };
};
