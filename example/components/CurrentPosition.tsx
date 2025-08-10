import React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { CameraPosition } from "native-maps";

const COORDINATE_PRECISION = 6;

interface CurrentPositionProps {
  position: CameraPosition;
}

export const CurrentPosition: React.FC<CurrentPositionProps> = ({
  position,
}) => (
  <>
    <Text style={styles.sectionTitle}>Current Position</Text>
    <View style={styles.container}>
      <Text style={styles.text}>
        Lat: {position.latitude.toFixed(COORDINATE_PRECISION)}
      </Text>
      <Text style={styles.text}>
        Lng: {position.longitude.toFixed(COORDINATE_PRECISION)}
      </Text>
      <Text style={styles.text}>Zoom: {position.zoom}</Text>
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
    backgroundColor: "#f0f7ff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d0e7ff",
  },
  text: {
    fontSize: 14,
    color: "#0066cc",
    marginVertical: 2,
  },
});
