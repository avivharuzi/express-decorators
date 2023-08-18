import { RouteParameterConvert } from '../types.js';
import { initRouterMetaData } from './initRouterMetadata.js';

export const createParameterDecorator = <TNewParameter>(
  convert: RouteParameterConvert<TNewParameter>
) => {
  return (target: any, propertyKey: string, parameterIndex: number) => {
    const routerMetadata = initRouterMetaData(target, propertyKey);

    routerMetadata.methodsMetadata[
      propertyKey
    ].modificationMetadata.parameters.push({
      index: parameterIndex,
      convert,
    });
  };
};
