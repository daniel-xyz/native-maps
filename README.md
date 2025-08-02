# NativeMaps

An **experimental** React Native maps library. It's my first native module project, built as a way to learn React Native’s new architecture and platform-native languages.

> **Note:** This is a work in progress and **not production-ready**.

## Goals

- 🚀 **Performance-focused** using TurboModules, Fabric, and NitroModules
- 🍏 **Cross-platform** support for Apple MapKit (iOS) and Google Maps (Android)
- 📍 **Marker clustering** built-in and real-time
- 🔌 **Production-ready** sometime in the future

## Roadmap / TODO

- [x] Initialize project with `create-expo-module`
- [x] Implement basic AppleMaps view (iOS)
- [ ] Make basic props for AppleMaps view work (onMapPress, initialRegion, showsUserLocation, mapType, setCamera)
- [ ] Implement basic GoogleMaps view (Android)
- [ ] Make basic props for GoogleMaps view work
- [ ] Show custom markers with custom views (AppleMaps)
- [ ] Show custom markers with custom views (GoogleMaps)
- [ ] Add onPress event to markers (both platforms)
- [ ] Implement native marker clustering (AppleMaps)
- [ ] Implement native marker clustering (GoogleMaps)
- [ ] Optimize collision and clustering with NitroModules
- [ ] Implement web support

## License

MIT © Daniel Bischoff
