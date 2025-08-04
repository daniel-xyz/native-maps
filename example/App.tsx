import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import { AppleMaps, AppleMapsViewRef } from "native-maps";
import { MapHeader, SettingsPanel } from "./components";
import {
  MapStateProvider,
  useMapStateContext,
} from "./contexts/MapStateContext";

function MapContent({
  mapRef,
}: {
  mapRef: React.RefObject<AppleMapsViewRef | null>;
}) {
  const { mapType, showsUserLocation } = useMapStateContext();
  const { cameraPosition, handleMapPress } = useMapStateContext();

  return (
    <>
      <MapHeader />
      <AppleMaps.View
        ref={mapRef}
        style={styles.map}
        onMapPress={handleMapPress}
        cameraPosition={cameraPosition}
        showsUserLocation={showsUserLocation}
        mapType={mapType}
      />
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
