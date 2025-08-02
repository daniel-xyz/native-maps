import { registerWebModule, NativeModule } from "expo";

/**
 * Web implementation of the Apple Maps module
 * This provides a minimal fallback for web platforms
 */
class AppleMapsModule extends NativeModule {
  // Web implementation - no additional functionality needed
  // The view component will handle web rendering
}

export default registerWebModule(AppleMapsModule, "AppleMapsModule");
