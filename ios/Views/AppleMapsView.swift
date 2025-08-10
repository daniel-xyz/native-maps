import ExpoModulesCore
import MapKit

class AppleMapsView: ExpoView, MKMapViewDelegate {
  let mapView = MKMapView()
  let onMapPress = EventDispatcher()
  let onCameraPositionChange = EventDispatcher()
  
  private var cameraChangeTimer: Timer?
  private var lastReportedPosition: (lat: Double, lng: Double, zoom: Double)?

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


