import React, { useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useMapStateContext } from "../contexts/MapStateContext";
import { MARKER_TEST_PRESETS } from "../utils/markerTestPresets";

export function MarkerTestingPanel() {
  const { testMarkers, activeMarkerPreset, loadMarkerPreset, clearMarkers } =
    useMapStateContext();

  const handlePresetLoad = useCallback(
    (preset: (typeof MARKER_TEST_PRESETS)[0]) => {
      loadMarkerPreset(preset);
    },
    [loadMarkerPreset]
  );

  const handleClearMarkers = useCallback(() => {
    clearMarkers();
  }, [clearMarkers]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Marker Testing</Text>
        <View style={styles.markerCount}>
          <Text style={styles.countText}>
            {testMarkers.length} marker{testMarkers.length !== 1 ? "s" : ""}
          </Text>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.presetScroll}
        contentContainerStyle={styles.presetContainer}
        nestedScrollEnabled={true}
        decelerationRate="fast"
        scrollEventThrottle={16}
      >
        {MARKER_TEST_PRESETS.map((preset) => (
          <TouchableOpacity
            key={preset.name}
            style={[
              styles.presetButton,
              activeMarkerPreset === preset.name && styles.activePresetButton,
            ]}
            onPress={() => handlePresetLoad(preset)}
            accessibilityLabel={`Load ${preset.name} markers`}
          >
            <Text
              style={[
                styles.presetButtonText,
                activeMarkerPreset === preset.name &&
                  styles.activePresetButtonText,
              ]}
            >
              {preset.name}
            </Text>
            <Text
              style={[
                styles.presetDescription,
                activeMarkerPreset === preset.name &&
                  styles.activePresetDescription,
              ]}
            >
              {preset.description}
            </Text>
            <Text
              style={[
                styles.presetCount,
                activeMarkerPreset === preset.name && styles.activePresetCount,
              ]}
            >
              {preset.count} markers
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {testMarkers.length > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearMarkers}
          accessibilityLabel="Clear all test markers"
        >
          <Text style={styles.clearButtonText}>Clear All Markers</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.helpText}>
        💡 Markers are generated around the current map center. Move the map and
        reload a preset to test different areas.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  markerCount: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  presetScroll: {
    marginBottom: 16,
  },
  presetContainer: {
    paddingRight: 16,
  },
  presetButton: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
    minWidth: 140,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activePresetButton: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  presetButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  activePresetButtonText: {
    color: "#fff",
  },
  presetDescription: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
    lineHeight: 16,
  },
  activePresetDescription: {
    color: "#e6f3ff",
  },
  presetCount: {
    fontSize: 11,
    color: "#999",
    fontWeight: "500",
  },
  activePresetCount: {
    color: "#cce7ff",
  },
  clearButton: {
    backgroundColor: "#ff3b30",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  helpText: {
    fontSize: 12,
    color: "#666",
    lineHeight: 16,
    textAlign: "center",
    fontStyle: "italic",
  },
});
