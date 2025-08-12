import MapKit
import ExpoModulesCore

extension AppleMapsView {
  func updateMarkers(_ markers: [MarkerRecord]?) {
    // Ensure UI updates occur on the main thread
    if !Thread.isMainThread {
      DispatchQueue.main.async { [weak self] in
        self?.updateMarkers(markers)
      }
      return
    }

    let newMarkers = markers ?? []

    // Build lookup of incoming markers by id
    var incomingById: [String: (coordinate: CLLocationCoordinate2D, title: String?)] = [:]
    for marker in newMarkers {
      let id = marker.id
      let latitude = marker.coordinates.latitude
      let longitude = marker.coordinates.longitude
      let title = marker.title
      incomingById[id] = (CLLocationCoordinate2D(latitude: latitude, longitude: longitude), title)
    }

    // Remove annotations that are no longer present
    let existingIds = Set(markerAnnotations.keys)
    let incomingIds = Set(incomingById.keys)
    let idsToRemove = existingIds.subtracting(incomingIds)
    for id in idsToRemove {
      if let annotation = markerAnnotations[id] {
        mapView.removeAnnotation(annotation)
        markerAnnotations.removeValue(forKey: id)
      }
    }

    // Upsert existing and add new ones
    for (id, payload) in incomingById {
      if let existing = markerAnnotations[id] {
        // Update only if changed
        if !coordinatesEqual(existing.coordinate, payload.coordinate) {
          existing.coordinate = payload.coordinate
        }
        if existing.title != payload.title {
          existing.title = payload.title
        }
      } else {
        // Create new annotation
        let annotation = MKPointAnnotation()
        annotation.coordinate = payload.coordinate
        annotation.title = payload.title
        markerAnnotations[id] = annotation
        mapView.addAnnotation(annotation)
      }
    }
  }

  func coordinatesEqual(_ a: CLLocationCoordinate2D, _ b: CLLocationCoordinate2D) -> Bool {
    let epsilon = 1e-7
    return abs(a.latitude - b.latitude) < epsilon && abs(a.longitude - b.longitude) < epsilon
  }
}


