import * as React from 'react';

import { NativeMapsViewProps } from './NativeMaps.types';

export default function NativeMapsView(props: NativeMapsViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
