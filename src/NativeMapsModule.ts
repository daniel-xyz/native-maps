import { NativeModule, requireNativeModule } from 'expo';

import { NativeMapsModuleEvents } from './NativeMaps.types';

declare class NativeMapsModule extends NativeModule<NativeMapsModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<NativeMapsModule>('NativeMaps');
