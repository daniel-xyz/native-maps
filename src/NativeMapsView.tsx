import { requireNativeView } from "expo";
import * as React from "react";

import { NativeMapsViewProps } from "./NativeMaps.types";

const NativeView: React.ComponentType<NativeMapsViewProps> =
  requireNativeView("NativeMaps");

/**
 * Native Maps view component that renders a MapKit view on iOS and a map placeholder on Android
 */
export default function NativeMapsView(props: NativeMapsViewProps) {
  return <NativeView {...props} />;
}
