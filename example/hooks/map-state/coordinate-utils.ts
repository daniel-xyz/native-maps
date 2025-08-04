import type { MapPressEvent, Coordinate } from "native-maps";
import { COORDINATE_PRECISION } from "./constants";

/**
 * Formats a coordinate pair into a readable string
 */
export const formatCoordinate = (coordinate: Coordinate): string => {
  const formattedLat = coordinate.latitude.toFixed(COORDINATE_PRECISION);
  const formattedLng = coordinate.longitude.toFixed(COORDINATE_PRECISION);
  return `${formattedLat}, ${formattedLng}`;
};

/**
 * Validates if a map press event contains valid coordinate data
 */
export const isValidMapPressEvent = (event: MapPressEvent): boolean => {
  return !!event?.nativeEvent?.coordinate;
};
