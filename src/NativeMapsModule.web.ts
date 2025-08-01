import { registerWebModule, NativeModule } from "expo";

/**
 * Web implementation of the native maps module
 * This provides a minimal fallback for web platforms
 */
class NativeMapsModule extends NativeModule {
  // Web implementation - no additional functionality needed
  // The view component will handle web rendering
}

export default registerWebModule(NativeMapsModule, "NativeMapsModule");
