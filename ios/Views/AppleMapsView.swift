import ExpoModulesCore
import MapKit

class AppleMapsView: ExpoView, MKMapViewDelegate {
  let mapView = MKMapView()
  let onMapPress = EventDispatcher()
  let onCameraPositionChange = EventDispatcher()
  
  var cameraChangeTimer: Timer?
  var lastReportedPosition: (lat: Double, lng: Double, zoom: Double)?
  var markerAnnotations: [String: MKPointAnnotation] = [:]

  required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)
    clipsToBounds = true
    mapView.delegate = self
    
    let tapGesture = UITapGestureRecognizer(target: self, action: #selector(handleMapTap(_:)))
    mapView.addGestureRecognizer(tapGesture)
    
    addSubview(mapView)
  }
  
  deinit {
    cameraChangeTimer?.invalidate()
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


