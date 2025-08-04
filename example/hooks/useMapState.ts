import { useState, useEffect, useCallback } from "react";
import type { MapPressEvent, MapType, CameraPositionChange } from "native-maps";
import type { PresetLocation } from "../types";
import {
  DEFAULT_CAMERA_POSITION,
  formatCoordinate,
  isValidMapPressEvent,
  updateCameraPosition,
  type UseMapStateReturn,
  type UseMapStateProps,
} from "./map-state";

/**
 * Custom hook for managing map state and interactions
 * @param mapRef - Reference to the AppleMapsView component
 * @returns Map state, actions, and event handlers
 */
export const useMapState = ({
  mapRef,
}: UseMapStateProps): UseMapStateReturn => {
  const [showSettings, setShowSettings] = useState(false);
  const [mapType, setMapType] = useState<MapType>("standard");
  const [showsUserLocation, setShowsUserLocation] = useState(true);
  const [animateCamera, setAnimateCamera] = useState(true);
  const [cameraPosition, setCameraPosition] = useState<CameraPositionChange>(
    DEFAULT_CAMERA_POSITION
  );

  const handleMapPress = useCallback(
    (event: MapPressEvent) => {
      if (!isValidMapPressEvent(event)) {
        console.warn("Map pressed but no coordinate data available", { event });
        return;
      }

      const coordinate = event.nativeEvent.coordinate;
      const formattedCoordinate = formatCoordinate(coordinate);

      console.log("Map pressed at coordinates:", { formattedCoordinate });
    },
    [isValidMapPressEvent, formatCoordinate]
  );

  const handleLocationPreset = useCallback(
    (location: PresetLocation) => {
      updateCameraPosition(mapRef, {
        latitude: location.latitude,
        longitude: location.longitude,
        zoom: location.zoom,
        animated: animateCamera,
      });
      setShowSettings(false);
    },
    [mapRef, animateCamera]
  );

  const toggleSettings = useCallback(() => {
    setShowSettings((prev) => !prev);
  }, [showSettings]);

  return {
    // State
    showSettings,
    mapType,
    showsUserLocation,
    cameraPosition,
    animateCamera,

    // State setters
    setShowSettings,
    setMapType,
    setShowsUserLocation,
    setCameraPosition,
    setAnimateCamera,

    // Action handlers
    handleMapPress,
    handleLocationPreset,
    toggleSettings,
  };
};
