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
});
