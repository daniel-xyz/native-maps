import type { CameraPosition } from "native-maps";

/**
 * Default camera position for the map (Berlin, Germany)
 */
export const DEFAULT_CAMERA_POSITION: CameraPosition = {
  latitude: 52.52,
  longitude: 13.405,
  zoom: 12,
};

/**
 * Number of decimal places for coordinate formatting
 */
export const COORDINATE_PRECISION = 6;
