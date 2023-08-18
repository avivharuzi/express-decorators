import { RouterMetadata } from '../types.js';
import { routerMetadataSymbol } from './routerMetadataSymbol.js';

export const extractRouterMetadata = (cls: any): RouterMetadata | null => {
  return (
    cls[routerMetadataSymbol] || cls.prototype?.[routerMetadataSymbol] || null
  );
};
