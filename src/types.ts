import * as express from 'express';

export type RoutePath = string | RegExp;

export type RoutePaths = RoutePath[];

export type RoutePathOrPaths = RoutePath | RoutePaths;

export enum RouteHttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
  ALL = 'ALL',
}

export interface RouteContext {
  req: express.Request;
  res: express.Response;
  next: () => void;
}

export interface RouterMetadata {
  pathOrPaths: RoutePathOrPaths;
  expressRouter: express.Router;
  methodsMetadata: Record<string, RouteMethodMetadata>;
}

export interface RouteMethodMetadata {
  modificationMetadata: RouteMethodModificationMetadata;
  modifications: RouteModification[];
}

export interface RouteMethodModificationMetadata {
  parameters: RouteParameterMetadata[];
}

export interface RouteModification {
  modify: RouteModify;
  descriptorValue: any;
}

export type RouteModify = (
  expressRouter: express.Router,
  descriptorValue: any,
  metadata: RouteMethodModificationMetadata
) => void;

export interface RouteParameterMetadata<TNewParameter = unknown> {
  index: number;
  convert: RouteParameterConvert<TNewParameter>;
}

export type RouteParameterConvert<TNewParameter = unknown> = (
  context: RouteContext
) => TNewParameter;
