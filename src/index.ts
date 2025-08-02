// Reexport the native module. On web, it will be resolved to AppleMapsModule.web.ts
// and on native platforms to AppleMapsModule.ts
export { default } from "./AppleMapsModule";
export { default as AppleMapsView } from "./AppleMapsView";
export * from "./AppleMaps.types";

import AppleMapsViewComponent from "./AppleMapsView";

export const AppleMaps = {
  View: AppleMapsViewComponent,
};
