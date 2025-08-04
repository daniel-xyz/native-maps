/**
 * Component for displaying and selecting preset locations
 */

import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import type { PresetLocation } from "../types";

const PRESET_LOCATIONS: PresetLocation[] = [
  { name: "New York", latitude: 40.7128, longitude: -74.006, zoom: 12 },
  { name: "Tokyo", latitude: 35.6762, longitude: 139.6503, zoom: 12 },
  { name: "Berlin", latitude: 52.52, longitude: 13.405, zoom: 12 },
];

interface LocationPresetsProps {
  onLocationSelect: (location: PresetLocation) => void;
}

export function LocationPresets({ onLocationSelect }: LocationPresetsProps) {
  return (
    <>
      <Text style={styles.sectionTitle}>Quick Locations</Text>
      {PRESET_LOCATIONS.map((location, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => onLocationSelect(location)}
          accessibilityLabel={`Navigate to ${location.name}`}
        >
          <Text style={styles.buttonText}>{location.name}</Text>
          <Text style={styles.coords}>
            {location.latitude.toFixed(2)}, {location.longitude.toFixed(2)}
          </Text>
        </TouchableOpacity>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
    marginBottom: 12,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
    borderWidth: 1,
    borderColor: "#e1e1e1",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  coords: {
    fontSize: 12,
    color: "#666",
  },
});
