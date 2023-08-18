import * as express from 'express';

import { RouteContext, RouteHttpMethod, RoutePathOrPaths } from '../types.js';
import { createMethodDecorator, runThoroughPaths } from '../utils/index.js';

const HttpMethodDecorator = (
  method: RouteHttpMethod,
  pathOrPaths: RoutePathOrPaths
) => {
  return createMethodDecorator((expressRouter, descriptorValue, metadata) => {
    const cb = descriptorValue;

    const parameters = metadata.parameters.sort((a, b) => a.index - b.index);

    const expressHandler = async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const context: RouteContext = {
        req,
        res,
        next,
      };

      const cbParameters = parameters.map((parameter) =>
        parameter.convert(context)
      );

      try {
        const response = await Promise.resolve(cb(...cbParameters));

        if (response === undefined) {
          return;
        }

        res.send(response);
      } catch (error) {
        // TODO:: Handle error
      }
    };

    switch (method) {
      case RouteHttpMethod.GET:
        runThoroughPaths(pathOrPaths, (path) => {
          expressRouter.get(path, expressHandler);
        });
        break;
      case RouteHttpMethod.POST:
        runThoroughPaths(pathOrPaths, (path) => {
          expressRouter.post(path, expressHandler);
        });
        break;
      case RouteHttpMethod.PUT:
        runThoroughPaths(pathOrPaths, (path) => {
          expressRouter.put(path, expressHandler);
        });
        break;
      case RouteHttpMethod.DELETE:
        runThoroughPaths(pathOrPaths, (path) => {
          expressRouter.delete(path, expressHandler);
        });
        break;
      case RouteHttpMethod.PATCH:
        runThoroughPaths(pathOrPaths, (path) => {
          expressRouter.patch(path, expressHandler);
        });
        break;
      case RouteHttpMethod.OPTIONS:
        runThoroughPaths(pathOrPaths, (path) => {
          expressRouter.options(path, expressHandler);
        });
        break;
      case RouteHttpMethod.HEAD:
        runThoroughPaths(pathOrPaths, (path) => {
          expressRouter.head(path, expressHandler);
        });
        break;
      case RouteHttpMethod.ALL:
        runThoroughPaths(pathOrPaths, (path) => {
          expressRouter.all(path, expressHandler);
        });
        break;
    }
  });
};

export const HttpMethod = {
  Get: (pathOrPaths: RoutePathOrPaths) =>
    HttpMethodDecorator(RouteHttpMethod.GET, pathOrPaths),
  Post: (pathOrPaths: RoutePathOrPaths) =>
    HttpMethodDecorator(RouteHttpMethod.POST, pathOrPaths),
  Put: (pathOrPaths: RoutePathOrPaths) =>
    HttpMethodDecorator(RouteHttpMethod.PUT, pathOrPaths),
  Delete: (pathOrPaths: RoutePathOrPaths) =>
    HttpMethodDecorator(RouteHttpMethod.DELETE, pathOrPaths),
  Patch: (pathOrPaths: RoutePathOrPaths) =>
    HttpMethodDecorator(RouteHttpMethod.PATCH, pathOrPaths),
  Options: (pathOrPaths: RoutePathOrPaths) =>
    HttpMethodDecorator(RouteHttpMethod.OPTIONS, pathOrPaths),
  Head: (pathOrPaths: RoutePathOrPaths) =>
    HttpMethodDecorator(RouteHttpMethod.HEAD, pathOrPaths),
  All: (pathOrPaths: RoutePathOrPaths) =>
    HttpMethodDecorator(RouteHttpMethod.ALL, pathOrPaths),
};
