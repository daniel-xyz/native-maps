import type {
  MapType,
  CameraPosition,
  CameraPositionChange,
} from "native-maps";

export type PresetLocation = CameraPositionChange & {
  name: string;
};

export type { MapType, CameraPosition };

export interface MapState {
  showSettings: boolean;
  mapType: MapType;
  showsUserLocation: boolean;
  cameraPosition: CameraPosition;
  animateCamera: boolean;
}

export interface MapActions {
  setShowSettings: (show: boolean) => void;
  setMapType: (type: MapType) => void;
  setShowsUserLocation: (show: boolean) => void;
  setCameraPosition: (position: CameraPosition) => void;
  setAnimateCamera: (animate: boolean) => void;
  handleLocationPreset: (location: PresetLocation) => void;
  toggleSettings: () => void;
}
