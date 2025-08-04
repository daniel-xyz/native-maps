import type { MapPressEvent, AppleMapsViewRef } from "native-maps";
import type { MapState, MapActions } from "../../types";

/**
 * Return type for the useMapState hook
 */
export interface UseMapStateReturn extends MapState, MapActions {
  handleMapPress: (event: MapPressEvent) => void;
}

/**
 * Props for the useMapState hook
 */
export interface UseMapStateProps {
  mapRef: React.RefObject<AppleMapsViewRef | null>;
}
