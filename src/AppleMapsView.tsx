import { requireNativeView } from "expo";
import * as React from "react";

import {
  AppleMapsViewProps,
  AppleMapsViewRef,
  CameraPositionChange,
} from "./AppleMaps.types";

const NativeView: React.ComponentType<AppleMapsViewProps & { ref?: any }> =
  requireNativeView("AppleMaps");

const AppleMapsView = React.forwardRef<AppleMapsViewRef, AppleMapsViewProps>(
  (props, ref) => {
    const nativeRef = React.useRef<any>(null);

    React.useImperativeHandle(
      ref,
      () => ({
        setCameraPosition: async (props: CameraPositionChange) => {
          if (nativeRef.current?.setCameraPosition) {
            await nativeRef.current.setCameraPosition(
              props.latitude,
              props.longitude,
              props.zoom,
              props.animated
            );
          }
        },
      }),
      []
    );

    return <NativeView ref={nativeRef} {...props} />;
  }
);

AppleMapsView.displayName = "AppleMapsView";

export default AppleMapsView;
