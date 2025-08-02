package expo.modules.googlemaps

import android.content.Context
import android.view.MotionEvent
import android.view.View
import android.widget.FrameLayout
import android.widget.TextView
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ExpoView

/**
 * Google Maps view component for Android - Placeholder implementation
 * In production, this would use Google Maps SDK with MapView
 */
class GoogleMapsView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
  private val onMapPress by EventDispatcher()

  // Placeholder - would be replaced with Google Maps MapView in production
  private val mapPlaceholder = TextView(context).apply {
    text = "🗺️ Google Maps\n(Tap for coordinates)\n\nProduction: Google Maps SDK"
    textAlignment = View.TEXT_ALIGNMENT_CENTER
    textSize = 14f
    setPadding(20, 20, 20, 20)
    setBackgroundColor(0xFFF0F8FF.toInt()) // Light blue background
    layoutParams = FrameLayout.LayoutParams(
      FrameLayout.LayoutParams.MATCH_PARENT,
      FrameLayout.LayoutParams.MATCH_PARENT
    )
  }

  // Default region (San Francisco)
  private var centerLatitude = 37.7749
  private var centerLongitude = -122.4194
  private var showsUserLocation = false
  private var mapType = "standard"

  init {
    addView(mapPlaceholder)
    
    // Touch handling for placeholder
    setOnTouchListener { _, event ->
      if (event.action == MotionEvent.ACTION_DOWN) {
        // Convert touch to coordinates relative to center
        val latitude = centerLatitude + (event.y / height - 0.5) * 0.01
        val longitude = centerLongitude + (event.x / width - 0.5) * 0.01
        
        // Send event with react-native-maps compatible structure
        onMapPress(mapOf(
          "coordinate" to mapOf(
            "latitude" to latitude,
            "longitude" to longitude
          )
        ))
      }
      true
    }
  }
  
  fun setInitialRegion(latitude: Double, longitude: Double, zoom: Double) {
    centerLatitude = latitude
    centerLongitude = longitude
    // In production: update Google Maps camera position with zoom level
    updatePlaceholderText()
  }
  
  fun setShowsUserLocation(shows: Boolean) {
    showsUserLocation = shows
    // In production: toggle user location display on Google Maps
    updatePlaceholderText()
  }
  
  fun setMapType(type: String) {
    mapType = type
    // In production: change Google Maps type (normal, satellite, hybrid, terrain)
    updatePlaceholderText()
  }
  
  private fun updatePlaceholderText() {
    mapPlaceholder.text = "🗺️ Google Maps ($mapType)\n(Tap for coordinates)\n\nUser Location: $showsUserLocation\nLat: ${centerLatitude.format(4)}, Lng: ${centerLongitude.format(4)}"
  }
  
  private fun Double.format(digits: Int) = "%.${digits}f".format(this)
}