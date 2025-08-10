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
  Dimensions,
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
    locationPermissionGranted,
    setMapType,
    setShowsUserLocation,
    setAnimateCamera,
    handleLocationPreset,
    toggleSettings,
    requestLocationPermission,
  } = useMapStateContext();
  return (
    <Modal
      visible={showSettings}
      animationType="slide"
      transparent={true}
      onRequestClose={toggleSettings}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={toggleSettings}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <MapTypeSelector selectedType={mapType} onTypeChange={setMapType} />

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>
                Location Permission {locationPermissionGranted ? "✓" : ""}
              </Text>
              {!locationPermissionGranted ? (
                <TouchableOpacity
                  style={styles.permissionButton}
                  onPress={requestLocationPermission}
                >
                  <Text style={styles.permissionButtonText}>Enable</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.permissionGrantedText}>Granted</Text>
              )}
            </View>

            <View
              style={[
                styles.settingRow,
                !locationPermissionGranted && styles.disabledRow,
              ]}
            >
              <Text
                style={[
                  styles.settingLabel,
                  !locationPermissionGranted && styles.disabledLabel,
                ]}
              >
                Show User Location
              </Text>
              <Switch
                value={showsUserLocation}
                onValueChange={setShowsUserLocation}
                disabled={!locationPermissionGranted}
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
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const { height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContainer: {
    height: screenHeight * 0.75,
    backgroundColor: "#f5f5f5",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
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
  disabledRow: {
    opacity: 0.5,
  },
  disabledLabel: {
    color: "#999",
  },
  permissionButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  permissionButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  permissionGrantedText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "500",
  },
});
