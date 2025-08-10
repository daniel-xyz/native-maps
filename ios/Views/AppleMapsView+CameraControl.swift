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
}


