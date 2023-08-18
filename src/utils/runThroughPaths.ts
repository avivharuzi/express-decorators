import { RoutePath, RoutePathOrPaths } from '../types.js';

export const runThoroughPaths = (
  pathOrPaths: RoutePathOrPaths,
  cb: (path: RoutePath) => void
): void => {
  if (typeof pathOrPaths === 'string' || pathOrPaths instanceof RegExp) {
    cb(pathOrPaths);
  } else {
    pathOrPaths.forEach((path) => {
      cb(path);
    });
  }
};
