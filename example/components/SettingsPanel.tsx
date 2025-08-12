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
import { CurrentCameraPosition } from "./CurrentPosition";
import { MarkerTestingPanel } from "./MarkerTestingPanel";
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
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={styles.backgroundTouchArea}
          activeOpacity={1}
          onPress={toggleSettings}
        />
        <View style={styles.modalContainer}>
          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={true}
            bounces={true}
            keyboardShouldPersistTaps="handled"
            scrollEventThrottle={16}
            nestedScrollEnabled={true}
          >
            <MapTypeSelector selectedType={mapType} onTypeChange={setMapType} />

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Location Permission</Text>
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
              <View style={styles.switchContainer}>
                <Switch
                  value={showsUserLocation}
                  onValueChange={setShowsUserLocation}
                  disabled={!locationPermissionGranted}
                  trackColor={{ false: "#ccc", true: "#007AFF" }}
                  thumbColor="#fff"
                  accessibilityLabel="Toggle user location visibility"
                />
              </View>
            </View>

            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Animate Camera</Text>
              <View style={styles.switchContainer}>
                <Switch
                  value={animateCamera}
                  onValueChange={setAnimateCamera}
                  trackColor={{ false: "#ccc", true: "#007AFF" }}
                  thumbColor="#fff"
                  accessibilityLabel="Toggle camera animations"
                />
              </View>
            </View>

            <LocationPresets onLocationSelect={handleLocationPreset} />
            <MarkerTestingPanel />
            <CurrentCameraPosition position={cameraPosition} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const { height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    position: "relative",
  },
  backgroundTouchArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
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
    zIndex: 2, // Ensure modal content is above background touch area
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 44, // Increased for better touch targets
    paddingVertical: 4,
  },
  settingLabel: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  switchContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 8, // Add some spacing from the label
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
