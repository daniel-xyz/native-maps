export { default } from "./AppleMapsModule";
export { default as AppleMapsView } from "./AppleMapsView";
export { AppleMapsMarker as AppleMapsMarkerComponent } from "./markers/AppleMapsMarker";
export * from "./AppleMaps.types";

import AppleMapsViewComponent from "./AppleMapsView";
import { AppleMapsMarker as MarkerComponent } from "./markers/AppleMapsMarker";

/**
 * Apple Maps components namespace
 *
 * @example
 * ```tsx
 * import { AppleMaps } from 'native-maps';
 *
 * <AppleMaps.View>
 *   <AppleMaps.Marker
 *     id="marker1"
 *     coordinates={{ latitude: 37.78825, longitude: -122.4324 }}
 *     title="San Francisco"
 *   />
 * </AppleMaps.View>
 * ```
 */
export const AppleMaps = {
  View: AppleMapsViewComponent,
  Marker: MarkerComponent,
};
