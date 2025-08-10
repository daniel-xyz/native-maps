import ExpoModulesCore
import MapKit

class AppleMapsView: ExpoView {
  let mapView = MKMapView()
  let onMapPress = EventDispatcher()

  required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)
    clipsToBounds = true
    
    // Configure map view with sensible defaults
    // mapView.mapType = .standard
    // mapView.isZoomEnabled = true
    // mapView.isScrollEnabled = true
    // mapView.isRotateEnabled = true
    // mapView.isPitchEnabled = true
    // mapView.showsUserLocation = false
    
    let tapGesture = UITapGestureRecognizer(target: self, action: #selector(handleMapTap(_:)))
    mapView.addGestureRecognizer(tapGesture)
    
    addSubview(mapView)
  }
  
  @objc private func handleMapTap(_ gesture: UITapGestureRecognizer) {
    let point = gesture.location(in: mapView)
    let coordinate = mapView.convert(point, toCoordinateFrom: mapView)
    
    let coordinateData = [
      "latitude": coordinate.latitude,
      "longitude": coordinate.longitude
    ]
    
    onMapPress(["coordinate": coordinateData])
  }

  override func layoutSubviews() {
    super.layoutSubviews()
    mapView.frame = bounds
  }
}


