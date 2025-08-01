import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapScreen from "./MapScreen";

export default function App() {
  const [showMap, setShowMap] = useState(false);

  if (showMap) {
    return <MapScreen onBack={() => setShowMap(false)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>🗺️ Native Maps</Text>
        <Text style={styles.subtitle}>
          Simple example showing native MapKit integration
        </Text>

        <TouchableOpacity
          style={styles.mapButton}
          onPress={() => setShowMap(true)}
        >
          <Text style={styles.mapButtonText}>Open Map View</Text>
        </TouchableOpacity>

        <Text style={styles.instruction}>
          Tap the map to see coordinates logged to console
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  header: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
  },
  mapButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  mapButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  instruction: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    fontStyle: "italic",
  },
});
