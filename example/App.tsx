import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import { AppleMaps, AppleMapsViewRef } from "native-maps";
import { MapHeader, SettingsPanel } from "./components";
import {
  MapStateProvider,
  useMapStateContext,
} from "./contexts/MapStateContext";

interface MapContentProps {
  mapRef: React.RefObject<AppleMapsViewRef | null>;
}

function MapContent({ mapRef }: MapContentProps) {
  const {
    mapType,
    showsUserLocation,
    testMarkers,
    cameraPosition,
    handleMapPress,
    handleCameraPositionChange,
  } = useMapStateContext();

  return (
    <>
      <MapHeader />
      <AppleMaps.View
        ref={mapRef}
        style={styles.map}
        onMapPress={handleMapPress}
        onCameraPositionChange={handleCameraPositionChange}
        cameraPosition={cameraPosition}
        showsUserLocation={showsUserLocation}
        mapType={mapType}
      >
        {testMarkers.map((marker) => (
          <AppleMaps.Marker
            key={marker.id}
            id={marker.id}
            coordinates={marker.coordinates}
            title={marker.title}
          />
        ))}
      </AppleMaps.View>
      <SettingsPanel />
    </>
  );
}

export default function App() {
  const mapRef = useRef<AppleMapsViewRef>(null);

  return (
    <View style={styles.container}>
      <MapStateProvider mapRef={mapRef}>
        <MapContent mapRef={mapRef} />
      </MapStateProvider>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  map: {
    flex: 1,
  },
});
