import type { StyleProp, ViewStyle } from "react-native";

/**
 * Coordinate data for map interactions
 */
export type Coordinate = {
  latitude: number;
  longitude: number;
};

/**
 * Event payload for map press interactions
 */
export type MapPressEvent = {
  nativeEvent: {
    coordinate: Coordinate;
  };
};

/**
 * Props for the AppleMapsView component
 * Follows react-native-maps convention for production use
 */
export type AppleMapsViewProps = {
  /**
   * Callback that is called when user presses on the map
   * @param event - Contains coordinate information of the press location
   */
  onMapPress?: (event: MapPressEvent) => void;

  /**
   * Style to be applied to the map view
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Initial region to display on the map
   */
  initialRegion?: {
    latitude: number;
    longitude: number;
    zoom?: number;
  };

  /**
   * Whether the map should show the user's location
   * @default false
   */
  showsUserLocation?: boolean;

  /**
   * The map type to display
   * @default 'standard'
   */
  mapType?: "standard" | "satellite" | "hybrid";
};
