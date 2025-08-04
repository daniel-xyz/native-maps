/**
 * Component for displaying various settings for the map
 */

import React from "react";
import {
  Modal,
  ScrollView,
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MapTypeSelector } from "./MapTypeSelector";
import { LocationPresets } from "./LocationPresets";
import { CurrentPosition } from "./CurrentPosition";
import { useMapStateContext } from "../contexts/MapStateContext";

export function SettingsPanel() {
  const {
    showSettings,
    mapType,
    showsUserLocation,
    animateCamera,
    cameraPosition,
    setMapType,
    setShowsUserLocation,
    setAnimateCamera,
    handleLocationPreset,
    toggleSettings,
  } = useMapStateContext();
  return (
    <Modal
      visible={showSettings}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={toggleSettings}
    >
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Map Settings</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={toggleSettings}
            accessibilityLabel="Close settings"
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <MapTypeSelector selectedType={mapType} onTypeChange={setMapType} />

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Show User Location</Text>
            <Switch
              value={showsUserLocation}
              onValueChange={setShowsUserLocation}
              trackColor={{ false: "#ccc", true: "#007AFF" }}
              thumbColor="#fff"
              accessibilityLabel="Toggle user location visibility"
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Animate Camera</Text>
            <Switch
              value={animateCamera}
              onValueChange={setAnimateCamera}
              trackColor={{ false: "#ccc", true: "#007AFF" }}
              thumbColor="#fff"
              accessibilityLabel="Toggle camera animations"
            />
          </View>

          <LocationPresets onLocationSelect={handleLocationPreset} />
          <CurrentPosition position={cameraPosition} />
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  closeButtonText: {
    fontSize: 18,
    color: "#333",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
    marginBottom: 4,
  },
  settingLabel: {
    fontSize: 16,
    color: "#333",
  },
});
