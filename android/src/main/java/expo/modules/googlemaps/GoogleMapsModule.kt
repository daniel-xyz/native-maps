package expo.modules.googlemaps

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

/**
 * Google Maps module for Android - Placeholder implementation
 * In production, this would integrate with Google Maps SDK
 */
class GoogleMapsModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("GoogleMaps")

    View(GoogleMapsView::class) {
      // Props following react-native-maps API for Google Maps
      Prop("initialRegion") { view: GoogleMapsView, region: Map<String, Double> ->
        val lat = region["latitude"] ?: return@Prop
        val lng = region["longitude"] ?: return@Prop
        val zoom = region["zoom"] ?: 12.0
        view.setInitialRegion(lat, lng, zoom)
      }
      
      Prop("showsUserLocation") { view: GoogleMapsView, shows: Boolean ->
        view.setShowsUserLocation(shows)
      }
      
      Prop("mapType") { view: GoogleMapsView, type: String ->
        view.setMapType(type)
      }
      
      // Event following react-native-maps convention
      Events("onMapPress")
    }
  }
}