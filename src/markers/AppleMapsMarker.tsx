import * as React from "react";
import type { AppleMapsMarker as AppleMapsMarkerProps } from "../AppleMaps.types";
import { AppleMapsViewContext } from "./useCreateMarkerRegistry";

/**
 * A marker component for Apple Maps.
 * This is a non-rendering component that self-registers with the nearest
 * `AppleMaps.View` via context.
 *
 * @example
 * ```tsx
 * <AppleMaps.View>
 *   <AppleMaps.Marker
 *     id="marker1"
 *     coordinates={{ latitude: 37.78825, longitude: -122.4324 }}
 *     title="San Francisco"
 *   />
 * </AppleMaps.View>
 * ```
 *
 * Note: This component doesn't render anything on its own. It must be used as a child
 * of `AppleMaps.View`. On mount and when props change, it registers itself with the
 * containing map view; on unmount it unregisters.
 */
export function AppleMapsMarker(props: AppleMapsMarkerProps): null {
  const registry = React.useContext(AppleMapsViewContext);

  React.useEffect(() => {
    if (!registry) return;
    registry.addOrUpdateMarker({
      id: props.id,
      coordinates: props.coordinates,
      title: props.title,
    });
    return () => {
      registry.removeMarker(props.id);
    };
    // Re-register when id/coordinates/title change
  }, [
    registry,
    props.id,
    props.coordinates?.latitude,
    props.coordinates?.longitude,
    props.title,
  ]);

  return null;
}

AppleMapsMarker.displayName = "AppleMapsMarker";
