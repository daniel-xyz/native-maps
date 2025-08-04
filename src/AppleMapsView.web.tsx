import * as React from "react";

import { AppleMapsViewProps } from "./AppleMaps.types";

export default function AppleMapsView(props: AppleMapsViewProps) {
  const centerLat = props.cameraPosition?.latitude ?? 37.7749;
  const centerLng = props.cameraPosition?.longitude ?? -122.4194;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (props.onMapPress) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Convert click position to coordinates relative to center
      const latitude = centerLat + (y / rect.height - 0.5) * 0.01;
      const longitude = centerLng + (x / rect.width - 0.5) * 0.01;

      // Follow react-native-maps event structure
      props.onMapPress({
        nativeEvent: {
          coordinate: {
            latitude,
            longitude,
          },
        },
      });
    }
  };

  const getMapTypeDisplay = () => {
    switch (props.mapType) {
      case "satellite":
        return "Satellite View";
      case "hybrid":
        return "Hybrid View";
      default:
        return "Standard View";
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        flex: 1,
        backgroundColor: props.mapType === "satellite" ? "#2a2a2a" : "#f0f8ff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "14px",
        textAlign: "center",
        padding: "20px",
        color: props.mapType === "satellite" ? "white" : "black",
        ...(props.style as any),
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        🍎 Apple Maps ({getMapTypeDisplay()})
      </div>
      <div style={{ fontSize: "12px", opacity: 0.7 }}>
        Click for coordinates
        <br />
        {props.showsUserLocation && "📍 User Location Enabled"}
        <br />
        Production: Mapbox/Google Maps
      </div>
    </div>
  );
}
