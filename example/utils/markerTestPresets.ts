import type { CameraPosition, AppleMapsMarker } from "native-maps";
import type { MarkerTestPreset } from "../types";

/**
 * Constants for geographic calculations
 */
const KM_TO_DEGREES = 111.32; // Approximate kilometers per degree of latitude
const TWO_PI = 2 * Math.PI;
const DEG_TO_RAD = Math.PI / 180;

/**
 * Generates a random coordinate within a specified radius of a center point
 * @param center - The center coordinate
 * @param radiusKm - Radius in kilometers
 * @returns Random coordinate within the radius
 */
function randomCoordinateInRadius(
  center: CameraPosition,
  radiusKm: number
): { latitude: number; longitude: number } {
  // Convert radius from km to degrees (rough approximation)
  const radiusDegrees = radiusKm / KM_TO_DEGREES;

  const angle = Math.random() * TWO_PI;
  const distance = Math.random() * radiusDegrees;

  const latitude = center.latitude + distance * Math.cos(angle);
  const longitude =
    center.longitude +
    (distance * Math.sin(angle)) / Math.cos(center.latitude * DEG_TO_RAD);

  return { latitude, longitude };
}

/**
 * Generates markers in a grid pattern around a center point
 * @param center - The center coordinate
 * @param gridSize - Number of markers per side (e.g., 3 = 3x3 = 9 markers)
 * @param spacingKm - Spacing between markers in kilometers
 * @returns Array of markers in grid formation
 */
function generateGridMarkers(
  center: CameraPosition,
  gridSize: number,
  spacingKm: number
): AppleMapsMarker[] {
  const markers: AppleMapsMarker[] = [];
  const spacingDegrees = spacingKm / KM_TO_DEGREES;
  const halfGrid = Math.floor(gridSize / 2);

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const latitude = center.latitude + (i - halfGrid) * spacingDegrees;
      const longitude = center.longitude + (j - halfGrid) * spacingDegrees;

      markers.push({
        id: `grid-${i}-${j}`,
        coordinates: { latitude, longitude },
        title: `Grid Marker (${i}, ${j})`,
      });
    }
  }

  return markers;
}

/**
 * Generates markers in a circular pattern around a center point
 * @param center - The center coordinate
 * @param count - Number of markers to generate
 * @param radiusKm - Radius of the circle in kilometers
 * @returns Array of markers in circular formation
 */
function generateCircularMarkers(
  center: CameraPosition,
  count: number,
  radiusKm: number
): AppleMapsMarker[] {
  const markers: AppleMapsMarker[] = [];
  const radiusDegrees = radiusKm / KM_TO_DEGREES;

  for (let i = 0; i < count; i++) {
    const angle = (TWO_PI * i) / count;
    const latitude = center.latitude + radiusDegrees * Math.cos(angle);
    const longitude =
      center.longitude +
      (radiusDegrees * Math.sin(angle)) /
        Math.cos(center.latitude * DEG_TO_RAD);

    markers.push({
      id: `circle-${i}`,
      coordinates: { latitude, longitude },
      title: `Circle Marker ${i + 1}`,
    });
  }

  return markers;
}

/**
 * Generates random markers within a specified radius
 * @param center - The center coordinate
 * @param count - Number of markers to generate
 * @param radiusKm - Maximum radius in kilometers
 * @returns Array of randomly positioned markers
 */
function generateRandomMarkers(
  center: CameraPosition,
  count: number,
  radiusKm: number
): AppleMapsMarker[] {
  const markers: AppleMapsMarker[] = [];

  for (let i = 0; i < count; i++) {
    const coordinates = randomCoordinateInRadius(center, radiusKm);
    markers.push({
      id: `random-${i}`,
      coordinates,
      title: `Random Marker ${i + 1}`,
    });
  }

  return markers;
}

/**
 * Collection of predefined marker test presets for different testing scenarios
 */
export const MARKER_TEST_PRESETS: MarkerTestPreset[] = [
  {
    name: "Few Markers",
    description: "3 markers in a small cluster",
    count: 3,
    generateMarkers: (center) => generateRandomMarkers(center, 3, 0.5), // 0.5km radius
  },
  {
    name: "Small Grid",
    description: "3x3 grid of markers",
    count: 9,
    generateMarkers: (center) => generateGridMarkers(center, 3, 0.3), // 0.3km spacing
  },
  {
    name: "Circle Pattern",
    description: "12 markers in a circle",
    count: 12,
    generateMarkers: (center) => generateCircularMarkers(center, 12, 1.0), // 1km radius
  },
  {
    name: "Medium Random",
    description: "25 randomly distributed markers",
    count: 25,
    generateMarkers: (center) => generateRandomMarkers(center, 25, 2.0), // 2km radius
  },
  {
    name: "Large Grid",
    description: "7x7 grid (49 markers)",
    count: 49,
    generateMarkers: (center) => generateGridMarkers(center, 7, 0.2), // 0.2km spacing
  },
  {
    name: "Many Random",
    description: "100 randomly distributed markers",
    count: 100,
    generateMarkers: (center) => generateRandomMarkers(center, 100, 5.0), // 5km radius
  },
  {
    name: "Dense Cluster",
    description: "200 markers in a dense cluster",
    count: 200,
    generateMarkers: (center) => generateRandomMarkers(center, 200, 1.0), // 1km radius (dense)
  },
  {
    name: "Stress Test",
    description: "500 markers for performance testing",
    count: 500,
    generateMarkers: (center) => generateRandomMarkers(center, 500, 10.0), // 10km radius
  },
];
