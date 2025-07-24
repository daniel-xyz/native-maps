import { requireNativeView } from 'expo';
import * as React from 'react';

import { NativeMapsViewProps } from './NativeMaps.types';

const NativeView: React.ComponentType<NativeMapsViewProps> =
  requireNativeView('NativeMaps');

export default function NativeMapsView(props: NativeMapsViewProps) {
  return <NativeView {...props} />;
}
