import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { NativeMapsView, MapPressEvent } from "native-maps";

interface MapScreenProps {
  onBack: () => void;
}

export default function MapScreen({ onBack }: MapScreenProps) {
  const handleMapPress = (event: MapPressEvent) => {
    if (!event?.nativeEvent?.coordinate) {
      console.log("Map pressed but no coordinate data available");
      return;
    }

    const { latitude, longitude } = event.nativeEvent.coordinate;
    console.log(
      `Map pressed at coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <NativeMapsView
        style={styles.map}
        onMapPress={handleMapPress}
        initialRegion={{
          latitude: 37.7749,
          longitude: -122.4194,
          zoom: 12,
        }}
        showsUserLocation={true}
        mapType="standard"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    zIndex: 1,
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  map: {
    flex: 1,
  },
});
