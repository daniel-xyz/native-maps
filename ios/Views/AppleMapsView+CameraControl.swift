import Foundation
import MapKit

extension AppleMapsView {
  func setCameraPosition(latitude: Double, longitude: Double, zoom: Double, animated: Bool) {
    let center = CLLocationCoordinate2D(latitude: latitude, longitude: longitude)
    let deltaFromZoom = 360.0 / pow(2.0, zoom)
    let span = MKCoordinateSpan(latitudeDelta: deltaFromZoom, longitudeDelta: deltaFromZoom)
    let region = MKCoordinateRegion(center: center, span: span)
    
    DispatchQueue.main.async {
      self.mapView.setRegion(region, animated: animated)
    }
  }

  func mapView(_ mapView: MKMapView, regionDidChangeAnimated animated: Bool) {
    cameraChangeTimer?.invalidate()

    // Debounce rapid changes (e.g., during pinch zoom)
    cameraChangeTimer = Timer.scheduledTimer(withTimeInterval: 0.1, repeats: false) { [weak self] _ in
      self?.reportCameraChange()
    }
  }

  private func reportCameraChange() {
    let center = mapView.region.center
    let zoom = getZoomLevel()

    // Skip if position hasn't changed significantly
    if let last = lastReportedPosition,
       abs(last.lat - center.latitude) < 0.000001,
       abs(last.lng - center.longitude) < 0.000001,
       abs(last.zoom - zoom) < 0.01 {
      return
    }

    lastReportedPosition = (center.latitude, center.longitude, zoom)

    onCameraPositionChange([
      "latitude": center.latitude,
      "longitude": center.longitude,
      "zoom": zoom
    ])
  }

  private func getZoomLevel() -> Double {
    let longitudeDelta = mapView.region.span.longitudeDelta
    guard longitudeDelta > 0 else { return 0 }
    return max(0, min(20, log2(360.0 / longitudeDelta)))
  }
}


