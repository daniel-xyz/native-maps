import * as React from "react";
import type { AppleMapsMarker } from "../AppleMaps.types";

export type AppleMapsMarkerRegistry = {
  addOrUpdateMarker: (marker: AppleMapsMarker) => void;
  removeMarker: (markerId: string) => void;
};

export const AppleMapsViewContext =
  React.createContext<AppleMapsMarkerRegistry | null>(null);

export function useCreateMarkerRegistry(): {
  markerRegistry: AppleMapsMarkerRegistry;
  markersArray: AppleMapsMarker[];
} {
  const [markersMap, setMarkersMap] = React.useState<
    Map<string, AppleMapsMarker>
  >(new Map());

  const addOrUpdateMarker = React.useCallback((marker: AppleMapsMarker) => {
    setMarkersMap((previous) => {
      const next = new Map(previous);
      next.set(marker.id, marker);
      return next;
    });
  }, []);

  const removeMarker = React.useCallback((markerId: string) => {
    setMarkersMap((previous) => {
      if (!previous.has(markerId)) return previous;
      const next = new Map(previous);
      next.delete(markerId);
      return next;
    });
  }, []);

  const markerRegistry = React.useMemo<AppleMapsMarkerRegistry>(
    () => ({ addOrUpdateMarker, removeMarker }),
    [addOrUpdateMarker, removeMarker]
  );

  const markersArray = React.useMemo(
    () => Array.from(markersMap.values()),
    [markersMap]
  );

  return { markerRegistry, markersArray };
}
