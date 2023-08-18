import { RouteModify } from '../types.js';
import { initRouterMetaData } from './initRouterMetadata.js';

export const createMethodDecorator = (modify: RouteModify) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const routerMetadata = initRouterMetaData(target, propertyKey);

    routerMetadata.methodsMetadata[propertyKey].modifications.push({
      modify,
      descriptorValue: descriptor.value,
    });
  };
};
