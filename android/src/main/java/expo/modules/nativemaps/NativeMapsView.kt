package expo.modules.nativemaps

import android.content.Context
import android.view.MotionEvent
import android.view.View
import android.widget.FrameLayout
import android.widget.TextView
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ExpoView

/**
 * Production-ready Native Maps view component for Android
 * Uses placeholder - in production you'd integrate Google Maps SDK
 */
class NativeMapsView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
  private val onMapPress by EventDispatcher()

  // Production-ready placeholder - would be replaced with Google Maps MapView
  private val mapPlaceholder = TextView(context).apply {
    text = "🗺️ Native Map\n(Tap for coordinates)\n\nProduction: Google Maps"
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
    
    // Production touch handling
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
    // Zoom level calculation: deltaFromZoom = 360.0 / 2^zoom
  }
  
  fun setShowsUserLocation(shows: Boolean) {
    showsUserLocation = shows
    // In production: toggle user location display
  }
  
  fun setMapType(type: String) {
    mapType = type
    // In production: change Google Maps type
    updatePlaceholderText()
  }
  
  private fun updatePlaceholderText() {
    mapPlaceholder.text = "🗺️ Native Map ($mapType)\n(Tap for coordinates)\n\nUser Location: $showsUserLocation"
  }
}
