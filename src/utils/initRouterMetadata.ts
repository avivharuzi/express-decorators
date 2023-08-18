import * as express from 'express';

import { RouteMethodMetadata, RouterMetadata } from '../types.js';
import { extractRouterMetadata } from './extractRouterMetadata.js';
import { routerMetadataSymbol } from './routerMetadataSymbol.js';

export const initRouterMetaData = (
  cls: any,
  propertyKey: string | null = null
): RouterMetadata => {
  let routerMetadata = extractRouterMetadata(cls);

  if (!routerMetadata) {
    cls[routerMetadataSymbol] = {
      pathOrPaths: '/',
      expressRouter: express.Router(),
      methodsMetadata: {},
    } as RouterMetadata;

    routerMetadata = cls[routerMetadataSymbol];
  }

  if (
    propertyKey &&
    routerMetadata &&
    !routerMetadata.methodsMetadata[propertyKey]
  ) {
    routerMetadata.methodsMetadata[propertyKey] = {
      modificationMetadata: {
        parameters: [],
      },
      modifications: [],
    } as RouteMethodMetadata;
  }

  return routerMetadata as RouterMetadata;
};
