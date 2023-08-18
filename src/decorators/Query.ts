import { createParameterDecorator } from '../utils/index.js';

export const Query = (param?: string) =>
  createParameterDecorator(({ req }) => {
    if (param) {
      return req.query[param];
    }

    return req.query;
  });
