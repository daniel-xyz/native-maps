import { useState, useEffect, useCallback } from "react";
import * as Location from "expo-location";
import type {
  MapPressEvent,
  MapType,
  CameraPositionChange,
  CameraPositionChangeEvent,
  AppleMapsMarker,
} from "native-maps";
import type { PresetLocation, MarkerTestPreset } from "../types";
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
  const [testMarkers, setTestMarkers] = useState<AppleMapsMarker[]>([]);
  const [activeMarkerPreset, setActiveMarkerPreset] = useState<string | null>(
    null
  );

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

  const loadMarkerPreset = useCallback(
    (preset: MarkerTestPreset) => {
      try {
        const markers = preset.generateMarkers(cameraPosition);
        setTestMarkers(markers);
        setActiveMarkerPreset(preset.name);
        console.log(
          `Loaded ${markers.length} markers for preset: ${preset.name}`
        );
      } catch (error) {
        console.error("Error loading marker preset:", error);
        // Clear markers on error to avoid corrupted state
        setTestMarkers([]);
        setActiveMarkerPreset(null);
      }
    },
    [cameraPosition]
  );

  const clearMarkers = useCallback(() => {
    setTestMarkers([]);
    setActiveMarkerPreset(null);
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
    testMarkers,
    activeMarkerPreset,

    // State setters
    setShowSettings,
    setMapType,
    setShowsUserLocation,
    setCameraPosition,
    setAnimateCamera,
    setTestMarkers,
    setActiveMarkerPreset,

    // Action handlers
    handleMapPress,
    handleLocationPreset,
    handleCameraPositionChange,
    toggleSettings,
    requestLocationPermission,
    loadMarkerPreset,
    clearMarkers,
  };
};
