import * as express from 'express';

import { ClassInstance } from './util-types.js';
import { extractRouterMetadata, runThoroughPaths } from './utils/index.js';

export class Server {
  expressApplication: express.Application;

  constructor(expressApplication?: express.Application) {
    this.expressApplication = expressApplication || express.default();
  }

  registerRouter(routerClass: ClassInstance): void {
    const routerData = extractRouterMetadata(routerClass);

    if (!routerData) {
      return;
    }

    const { pathOrPaths, expressRouter } = routerData;

    runThoroughPaths(pathOrPaths, (path) => {
      this.expressApplication.use(path, expressRouter);
    });
  }
}
