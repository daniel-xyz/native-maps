// Reexport the native module. On web, it will be resolved to NativeMapsModule.web.ts
// and on native platforms to NativeMapsModule.ts
export { default } from './NativeMapsModule';
export { default as NativeMapsView } from './NativeMapsView';
export * from  './NativeMaps.types';
