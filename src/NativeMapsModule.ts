import { NativeModule, requireNativeModule } from "expo";

/**
 * Minimal native module for Maps functionality
 */
declare class NativeMapsModule extends NativeModule {
  // This module only provides the view component, no additional functions needed
}

// This call loads the native module object from the JSI.
export default requireNativeModule<NativeMapsModule>("NativeMaps");
