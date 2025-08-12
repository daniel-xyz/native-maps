import type {
  MapType,
  CameraPosition,
  CameraPositionChange,
  AppleMapsMarker,
} from "native-maps";

export type PresetLocation = CameraPositionChange & {
  name: string;
};

export type { MapType, CameraPosition };

export type MarkerTestPreset = {
  name: string;
  description: string;
  count: number;
  generateMarkers: (center: CameraPosition) => AppleMapsMarker[];
};

export interface MapState {
  showSettings: boolean;
  mapType: MapType;
  showsUserLocation: boolean;
  cameraPosition: CameraPosition;
  animateCamera: boolean;
  locationPermissionGranted: boolean;
  testMarkers: AppleMapsMarker[];
  activeMarkerPreset: string | null;
}

export interface MapActions {
  setShowSettings: (show: boolean) => void;
  setMapType: (type: MapType) => void;
  setShowsUserLocation: (show: boolean) => void;
  setCameraPosition: (position: CameraPosition) => void;
  setAnimateCamera: (animate: boolean) => void;
  handleLocationPreset: (location: PresetLocation) => void;
  toggleSettings: () => void;
  requestLocationPermission: () => Promise<void>;
  setTestMarkers: (markers: AppleMapsMarker[]) => void;
  setActiveMarkerPreset: (presetName: string | null) => void;
  loadMarkerPreset: (preset: MarkerTestPreset) => void;
  clearMarkers: () => void;
}
