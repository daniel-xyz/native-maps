import { registerWebModule, NativeModule } from 'expo';

import { NativeMapsModuleEvents } from './NativeMaps.types';

class NativeMapsModule extends NativeModule<NativeMapsModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(NativeMapsModule, 'NativeMapsModule');
