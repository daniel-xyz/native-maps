import React, { createContext, useContext } from "react";
import type {
  AppleMapsViewRef,
  MapPressEvent,
  CameraPositionChangeEvent,
} from "native-maps";
import { useMapState } from "../hooks/useMapState";
import type { MapState, MapActions } from "../types";

interface MapStateContextType extends MapState, MapActions {
  handleMapPress: (event: MapPressEvent) => void;
  handleCameraPositionChange: (event: CameraPositionChangeEvent) => void;
}

const MapStateContext = createContext<MapStateContextType | undefined>(
  undefined
);

interface MapStateProviderProps {
  children: React.ReactNode;
  mapRef: React.RefObject<AppleMapsViewRef | null>;
}

export function MapStateProvider({ children, mapRef }: MapStateProviderProps) {
  const mapState = useMapState({ mapRef });

  return (
    <MapStateContext.Provider value={mapState}>
      {children}
    </MapStateContext.Provider>
  );
}

export const useMapStateContext = () => {
  const context = useContext(MapStateContext);

  if (context === undefined) {
    throw new Error(
      "useMapStateContext must be used within a MapStateProvider"
    );
  }

  return context;
};
