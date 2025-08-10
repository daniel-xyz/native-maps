import type { StyleProp, ViewStyle } from "react-native";

export type Coordinate = {
  latitude: number;
  longitude: number;
};

export type MapType = "standard" | "satellite" | "hybrid";

export type CameraPosition = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type CameraPositionChange = {
  latitude: number;
  longitude: number;
  zoom: number;
  animated?: boolean;
};

export type MapPressEvent = {
  nativeEvent: {
    coordinate: Coordinate;
  };
};

export type CameraPositionChangeEvent = {
  nativeEvent: CameraPosition;
};

export type AppleMapsViewRef = {
  setCameraPosition: (props: CameraPositionChange) => Promise<void>;
};

export type AppleMapsViewProps = {
  onMapPress?: (event: MapPressEvent) => void;
  onCameraPositionChange?: (event: CameraPositionChangeEvent) => void;
  style?: StyleProp<ViewStyle>;
  cameraPosition?: CameraPosition;
  showsUserLocation?: boolean;
  mapType?: MapType;
};
