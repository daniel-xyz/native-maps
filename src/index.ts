export { default } from "./AppleMapsModule";
export { default as AppleMapsView } from "./AppleMapsView";
export * from "./AppleMaps.types";

export type * from "./AppleMaps.types";

import AppleMapsViewComponent from "./AppleMapsView";

export const AppleMaps = {
  View: AppleMapsViewComponent,
};
