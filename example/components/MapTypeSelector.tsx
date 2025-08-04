/**
 * Component for selecting the map type (e.g. standard, satellite, hybrid)
 */

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import type { MapType } from "native-maps";

const MAP_TYPES: MapType[] = ["standard", "satellite", "hybrid"];

interface MapTypeSelectorProps {
  selectedType: MapType;
  onTypeChange: (type: MapType) => void;
}

const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const MapTypeSelector: React.FC<MapTypeSelectorProps> = ({
  selectedType,
  onTypeChange,
}) => (
  <>
    <Text style={styles.sectionTitle}>Map Type</Text>
    <View style={styles.container}>
      {MAP_TYPES.map((type) => (
        <TouchableOpacity
          key={type}
          style={[styles.button, selectedType === type && styles.buttonActive]}
          onPress={() => onTypeChange(type)}
          accessibilityLabel={`Select ${type} map type`}
        >
          <Text
            style={[
              styles.buttonText,
              selectedType === type && styles.buttonTextActive,
            ]}
          >
            {capitalize(type)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </>
);

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
    marginBottom: 12,
  },
  container: {
    flexDirection: "row",
    marginBottom: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f8f8f8",
  },
  buttonActive: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  buttonTextActive: {
    color: "#fff",
  },
});
