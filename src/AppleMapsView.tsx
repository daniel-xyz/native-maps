import { requireNativeView } from "expo";
import * as React from "react";

import {
  AppleMapsViewProps,
  AppleMapsViewRef,
  CameraPositionChange,
  AppleMapsMarker,
} from "./AppleMaps.types";
import {
  AppleMapsViewContext,
  useCreateMarkerRegistry,
} from "./markers/useCreateMarkerRegistry";

type NativeViewPropsInternal = AppleMapsViewProps & {
  markers?: AppleMapsMarker[];
};

const NativeView: React.ComponentType<NativeViewPropsInternal & { ref?: any }> =
  requireNativeView("AppleMaps");

export interface AppleMapsViewWithChildrenProps extends AppleMapsViewProps {
  children?: React.ReactNode;
}

const AppleMapsView = React.forwardRef<
  AppleMapsViewRef,
  AppleMapsViewWithChildrenProps
>(({ children, ...props }, ref) => {
  const nativeRef = React.useRef<any>(null);
  const { markerRegistry, markersArray } = useCreateMarkerRegistry();

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

  return (
    <AppleMapsViewContext.Provider value={markerRegistry}>
      <>
        <NativeView ref={nativeRef} {...props} markers={markersArray} />
        {children}
      </>
    </AppleMapsViewContext.Provider>
  );
});

AppleMapsView.displayName = "AppleMapsView";

export default AppleMapsView;
