import Foundation
import MapKit

extension AppleMapsView {
  func setCameraPosition(latitude: Double, longitude: Double, zoom: Double, animated: Bool) {
    print("📍 setCameraPosition - lat: \(latitude), lng: \(longitude), zoom: \(zoom)")
    
    let center = CLLocationCoordinate2D(latitude: latitude, longitude: longitude)
    let deltaFromZoom = 360.0 / pow(2.0, zoom)
    let span = MKCoordinateSpan(latitudeDelta: deltaFromZoom, longitudeDelta: deltaFromZoom)
    let region = MKCoordinateRegion(center: center, span: span)
    
    DispatchQueue.main.async {
      self.mapView.setRegion(region, animated: animated)
      print("✅ map region updated successfully via setCameraPosition")
    }
  }
}


