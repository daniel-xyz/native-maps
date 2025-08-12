import ExpoModulesCore

/**
 * Record type that maps to the AppleMapsMarker TypeScript interface
 */
struct MarkerRecord: Record {
  @Field var id: String
  @Field var coordinates: CoordinateRecord
  @Field var title: String?
}

/**
 * Record type for coordinate data
 */
struct CoordinateRecord: Record {
  @Field var latitude: Double
  @Field var longitude: Double
}
