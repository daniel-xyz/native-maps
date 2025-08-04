/**
 * Header component with title and settings toggle
 */

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { useMapStateContext } from "../contexts/MapStateContext";

export function MapHeader() {
  const { showSettings, toggleSettings } = useMapStateContext();
  const statusBarHeight =
    Platform.OS === "android" ? StatusBar.currentHeight || 0 : 44;

  return (
    <View
      style={[
        styles.header,
        { paddingTop: styles.header.paddingVertical + statusBarHeight },
      ]}
    >
      <Text style={styles.title}>Native Maps Demo</Text>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={toggleSettings}
        accessibilityLabel={showSettings ? "Close settings" : "Open settings"}
      >
        <Text style={styles.settingsButtonText}>⚙️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  settingsButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  settingsButtonText: {
    fontSize: 18,
  },
});
