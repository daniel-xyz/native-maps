package expo.modules.nativemaps

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

/**
 * Production-ready Native Maps module for Android
 * Provides react-native-maps compatible API
 */
class NativeMapsModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("NativeMaps")

    View(NativeMapsView::class) {
      // Props following react-native-maps API
      Prop("initialRegion") { view: NativeMapsView, region: Map<String, Double> ->
        val lat = region["latitude"] ?: return@Prop
        val lng = region["longitude"] ?: return@Prop
        val zoom = region["zoom"] ?: 12.0
        view.setInitialRegion(lat, lng, zoom)
      }
      
      Prop("showsUserLocation") { view: NativeMapsView, shows: Boolean ->
        view.setShowsUserLocation(shows)
      }
      
      Prop("mapType") { view: NativeMapsView, type: String ->
        view.setMapType(type)
      }
      
      // Event following react-native-maps convention
      Events("onMapPress")
    }
  }
}