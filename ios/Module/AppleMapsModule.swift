import ExpoModulesCore
import MapKit

public class AppleMapsModule: Module {
  public func definition() -> ModuleDefinition {
    Name("AppleMaps")

    View(AppleMapsView.self) {
      Prop("cameraPosition") { (view: AppleMapsView, region: [String: Double]) in
        guard let lat = region["latitude"],
              let lng = region["longitude"] else { return }

        let zoom = region["zoom"] ?? 12.0
        guard zoom > 0 && zoom.isFinite else { return }

        // Route through the unified setter which ensures main-thread execution
        view.setCameraPosition(latitude: lat, longitude: lng, zoom: zoom, animated: false)
      }
      
      Prop("showsUserLocation") { (view: AppleMapsView, showsUserLocation: Bool) in
        view.mapView.showsUserLocation = showsUserLocation
      }
      
      Prop("mapType") { (view: AppleMapsView, mapType: String) in
        switch mapType {
        case "satellite":
          view.mapView.mapType = .satellite
        case "hybrid":
          view.mapView.mapType = .hybrid
        default:
          view.mapView.mapType = .standard
        }
      }
      
      AsyncFunction("setCameraPosition") { (view: AppleMapsView, latitude: Double, longitude: Double, zoom: Double, animated: Bool?) in
        print("📍 setCameraPosition - lat: \(latitude), lng: \(longitude), zoom: \(zoom)")
        view.setCameraPosition(latitude: latitude, longitude: longitude, zoom: zoom, animated: animated ?? true)
      }
      
      Events("onMapPress")
    }
  }
}


