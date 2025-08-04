import type { AppleMapsViewRef, CameraPositionChange } from "native-maps";

export const updateCameraPosition = async (
  mapRef: React.RefObject<AppleMapsViewRef | null>,
  cameraPosition: CameraPositionChange
): Promise<boolean> => {
  if (!mapRef.current) {
    console.warn("Map ref not available for camera position update");
    return false;
  }

  try {
    await mapRef.current.setCameraPosition(cameraPosition);
    console.log("Camera position updated successfully");
    return true;
  } catch (error) {
    console.error("Failed to update camera position:", {
      error: error instanceof Error ? error.message : String(error),
      cameraPosition: cameraPosition,
    });
    return false;
  }
};
