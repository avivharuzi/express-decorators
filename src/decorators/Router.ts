import { RoutePathOrPaths } from '../types.js';
import { ClassType } from '../util-types.js';
import { extractRouterMetadata } from '../utils/index.js';

export const Router = (pathOrPaths: RoutePathOrPaths = '/') => {
  return (target: ClassType) => {
    const routerMetadata = extractRouterMetadata(target);

    if (!routerMetadata) {
      return;
    }

    routerMetadata.pathOrPaths = pathOrPaths;

    const { expressRouter, methodsMetadata } = routerMetadata;

    Object.values(methodsMetadata).forEach(
      ({ modificationMetadata, modifications }) => {
        modifications.forEach(({ descriptorValue, modify }) => {
          modify(expressRouter, descriptorValue, modificationMetadata);
        });
      }
    );
  };
};
