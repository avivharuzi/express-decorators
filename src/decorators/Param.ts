import { createParameterDecorator } from '../utils/index.js';

export const Param = (param?: string) =>
  createParameterDecorator(({ req }) => {
    if (param) {
      return req.params[param];
    }

    return req.params;
  });
