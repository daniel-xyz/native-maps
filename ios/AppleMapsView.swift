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
