import { NativeModule, requireNativeModule } from "expo";

/**
 * Apple Maps native module for iOS MapKit functionality
 */
declare class AppleMapsModule extends NativeModule {
  // This module only provides the view component, no additional functions needed
}

// This call loads the native module object from the JSI.
export default requireNativeModule<AppleMapsModule>("AppleMaps");
