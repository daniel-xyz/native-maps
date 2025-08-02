import { requireNativeView } from "expo";
import * as React from "react";

import { AppleMapsViewProps } from "./AppleMaps.types";

const NativeView: React.ComponentType<AppleMapsViewProps> =
  requireNativeView("AppleMaps");

/**
 * Apple Maps view component that renders a MapKit view on iOS
 */
export default function AppleMapsView(props: AppleMapsViewProps) {
  return <NativeView {...props} />;
}
